import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Form } from 'react-final-form'
import moment from 'moment'
import * as Yup from 'yup'
import { makeValidate, TextField } from 'mui-rff'
import FileDownload from 'js-file-download'
import buildUrl from 'build-url'

import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars'
import { getPRStatusLabel } from '../../../../../utils/common'

import { noAuthAxios } from '../../../../../utils/apiConfig'
import {
  setPRSearch,
  setPRDate,
} from '../../../../../store/actions/prTableActions'
import { apiPRExport } from '../../../../../utils/PaymentRequest'

export default function TablePartHead(props) {
  const dispatch = useDispatch()
  const { dataState } = props

  const { searchParams } = dataState
  const [mountedRef, setMountedRef] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)

  const { columns } = props

  const initialValues = {
    searchGeneral: searchParams.search,
  }
  const formSchema = Yup.object().shape({
    searchGeneral: Yup.string(),
  })

  const handleSearchGeneral = (e) => {
    const searchInput = e.searchGeneral === undefined ? '' : e.searchGeneral
    dispatch(setPRSearch(searchInput))
  }

  const handleDateSearch = (e) => {
    if (e.value === null) {
      dispatch(setPRDate({ 0: '', 1: '' }))
    } else {
      const startDate = moment(e.value[0]).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      const endDate = moment(e.value[1])
        .add(1, 'days')
        .subtract(1, 'seconds')
        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

      dispatch(setPRDate({ 0: startDate, 1: endDate }))
    }
  }

  const handleExportData = async () => {
    setExportLoading(true)
    // const paramsQuery = new URLSearchParams(searchParams).toString();
    const paramsQuery = buildUrl('', {
      disableCSV: true,
      queryParams: searchParams,
    })

    const apiResponse = await apiPRExport(paramsQuery)
    // console.log(apiResponse);
    if (apiResponse.status === 200) {
      // const dateFormat = moment(new Date()).format('YYYY-MM-DD-HH-mm-ss');
      // const fileName = `payment-request-export-${dateFormat}`;
      const status =
        getPRStatusLabel(searchParams.status) === 'New Request'
          ? 'For Processing'
          : getPRStatusLabel(searchParams.status)

      const dateFormat = moment(new Date()).format('YYYYMMDD')
      const fileName = `${dateFormat} - Payment Requests - ${status}`

      FileDownload(apiResponse.data, `${fileName}.xlsx`)

      toast.success(`Successfully downloaded ${fileName}.xlsx`, {
        className: 'download_successful_message',
      })
      setExportLoading(false)
    } else {
      toast.error('An error occurred, try again later.')
      setExportLoading(false)
    }
  }

  // canlendar rendering
  setTimeout(() => {
    setMountedRef(true)
  }, 1)

  return (
    <>
      <Grid container className="mui-datatables-head pr-table-head">
        <Grid item xs={6}>
          {/* <div className="data-search-field">
            <Form
              onSubmit={handleSearchGeneral}
              initialValues={initialValues}
              validate={makeValidate(formSchema)}
              render={({ handleSubmit, submitting, invalid, pristine }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    id="standard-basic"
                    name="searchGeneral"
                    placeholder="Search..."
                    variant="outlined"
                    inputProps={{ 'data-cy': 'main_search' }}
                  />
                  <SearchIcon
                    onClick={handleSubmit}
                    className="btn-submit-search"
                  />
                </form>
              )}
            />
            {mountedRef ? (
              <div className="date-filter">
                <DateRangePickerComponent
                  id="daterangepickers"
                  allowEdit={false}
                  placeholder="Filter by date"
                  onChange={handleDateSearch}
                  startDate={searchParams.dateStart}
                  endDate={searchParams.dateEnd}
                />
              </div>
            ) : (
              ''
            )}
          </div> */}
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            className="export-btn place-right"
            onClick={() => handleExportData()}
            disabled={exportLoading}
            data-cy="export_list"
          >
            {exportLoading ? 'Exporting...' : 'Export List'}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

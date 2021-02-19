import React from 'react';
// @ts-ignore
import { CD_STATUS } from '../../../utils/Constants';

const Badge = (i) => {
  const collectionStatusBadge = {
    [CD_STATUS.STATUS_FOR_RECEIPT]: <span className="cd-status-label status-for-receipt">For Receipt</span>,
    [CD_STATUS.STATUS_FOR_DEPOSIT]: <span className="cd-status-label status-for-deposit">For Deposit</span>,
    [CD_STATUS.STATUS_FOR_CLEARING]: <span className="cd-status-label status-clearing">Clearing</span>,
    [CD_STATUS.STATUS_CLEARED]: <span className="cd-status-label status-cleared">Cleared</span>,
    [CD_STATUS.STATUS_CANCELLED]: <span className="cd-status-label status-cancelled">Cancelled</span>,
    [CD_STATUS.STATUS_BOUNCED]: <span className="cd-status-label status-bounced">Bounced</span>,
  };

  return collectionStatusBadge[i];
};

export default Badge;

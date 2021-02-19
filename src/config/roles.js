// component's config object.
const components = {
  dds_admin_assistant: {
    component: 'AdminAssistant',
    url: '/requests',
    title: 'Admin Assistant',
    icon: 'menu',
    module: 1,
  },
  analytics: {
    component: 'Analytics',
    url: '/statistics',
    title: 'Analytics',
    icon: 'Analytics',
    module: 1,
  },
  messenger: {
    component: 'Messenger',
    url: '/messenger',
    title: 'Messenger',
    icon: 'messanger',
    module: 1,
  },
  my_request: {
    component: 'MyRequest',
    url: '/myrequest',
    title: 'My Request',
    icon: 'myrequest',
    module: 1,
  },
  scheduler: {
    component: 'MyScheduler',
    url: '/scheduler',
    title: 'Scheduler',
    icon: 'scheduler',
    module: 1,
  },
  reports: {
    component: 'MyReport',
    url: '/reports',
    title: 'Report',
    icon: 'report',
    module: 1,
  },
  contacts: {
    component: 'MyContacts',
    url: '/contacts',
    title: 'Contacts',
    icon: 'Contacts',
    module: 1,
  },
  audit_logs: {
    component: 'MyAuditLogs',
    url: '/audit_logs',
    title: 'Audit Logs',
    icon: 'audit',
    module: 1,
  },
  dds_requestor: {
    component: 'Requestor',
    url: '/requests',
    title: 'Requestor',
    icon: 'menu',
    module: 1,
  },
};

// modules for grouping.
const modules = {
  0: {
    title: 'Dashboard',
    icon: 'home',
    isExpendable: true,
  },
};

// component's access to roles.
const rolesConfig = {
  dds_admin_assistant: {
    routes: [
      components.dds_admin_assistant,
      components.messenger,
      components.analytics,
      components.my_request,
      components.reports,
      components.contacts,
      components.audit_logs,
      components.scheduler,
    ],
  },
  dds_requestor: {
    routes: [components.dds_requestor, components.scheduler],
  },
};

export { modules, rolesConfig };

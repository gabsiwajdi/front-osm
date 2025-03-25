import { Navigation } from 'src/app/@theme/types/navigation';

export const menus: Navigation[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard',
        icon: '#custom-status-up'
      }

    ]
  },
  {
    id: 'reception',
    title: 'Récepetion',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'gestSupplier',
        title: 'Géstion Fournisseurs',
        type: 'item',
        classes: 'nav-item',
        url: '/reception/supplier',
        icon: '#custom-status-up'
      },
      {
        id: 'bonRecption',
        title: 'Géstion Bon De Réception',
        type: 'item',
        classes: 'nav-item',
        url: '/reception/delivery',
        icon: '#custom-status-up'
      },
      {
        id: 'qaulityControl',
        title: 'Géstion Controle Qualité',
        type: 'item',
        classes: 'nav-item',
        url: '/reception/qualitycontrol',
        icon: '#custom-status-up'
      }
    ]
  },

  {
    id: 'production',
    title: 'Production',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'prod',
        title: 'Géstion Production',
        type: 'item',
        classes: 'nav-item',
        url: '/reception/supplier',
        icon: '#custom-status-up'
      },
      {
        id: 'stockage',
        title: 'Géstion Stockage',
        type: 'item',
        classes: 'nav-item',
        url: '/reception/delivery',
        icon: '#custom-status-up'
      },
      {
        id: 'qaulityControlhuile',
        title: 'Géstion Controle Qualité Huile',
        type: 'item',
        classes: 'nav-item',
        url: '/reception/qualitycontrol',
        icon: '#custom-status-up'
      }
    ]
  },

  {
    id: 'configuration',
    title: 'paramètres',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'generic',
        title: 'Géstion Types générique',
        type: 'collapse',
        icon: '#custom-level',
        children: [
          {
            id: 'gestionMoulain',
            title: 'Info Moulain',
            type: 'item',
            url: '/:'
          },
          {
            id: 'genericType',
            title: 'Géstion Type générique',
            type: 'item',
            url: '/:'
          },
          {
            id: 'qualityControlRuleManagement',
            title: 'Quality Control Rule Management',
            type: 'item',
            url: '/:'
          },
        ]
      },

    ]
  },

  {
    id: 'auth',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/auth/login',
        icon: '#custom-shield',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/auth/register',
        icon: '#custom-password-check',
        target: true,
        breadcrumbs: false
      }
    ]
  },




];

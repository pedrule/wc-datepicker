import '@polymer/polymer/polymer.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style is="custom-style" include="iron-flex iron-flex-alignment">
 
    html {
            --white: #ffffff;
            --white-medium: #f8f8f8;
            --white-deep: #e7e7e7;

            --grey-50: #f1f1f1;
            --grey-75: #dcdcdc;
            --grey-100: #eeeeee;
            --grey-150: #dddddd;
            --grey-200: #cccccc;
            --grey-300: #999999;
            --grey-400: #666666;
            --yellow-light: #ffd34d;
            --yellow-medium: #ffcc33;
            --yellow-deep: #f0ba18;
            --yellow-dark: #dba70d;

            --black-light: #333333;
            --black-medium-light: #202020;
            --black-medium: #111111;
            --black: #000000;

            --red: #d70000;

            --background-app: var(--white);
            --background-secondary: var(--white-medium);
            --selected-button-color: var(--black-light);
            --background-header-color: ; var(--yellow-medium);
            --background-header-light-color: var(--yellow-light);

            --main-header-height: 55px;
            --sub-header-height: 60px;
            --footer-heigth: 70px;
            
            --no-user-select :{
                -webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;
                cursor: pointer;
            };
            
            --box-shadow: {
                box-shadow: var(--grey-75) 0px 5px 9px;
            };
            
            /*
            * Menu button properties
            */
            
            --menu-button-width: 70px;
            --menu-button-height: 70px;
            
            /*
            * Menu bar properties
            */
            
            --menu-bar-collapsed: var(--menu-button-width);
            --menu-bar-expanded: 307px;
            
            
            
            /*
            *Iris customizer properties
            */
            
            --iris-tab-height: 76px;
            --iris-border-weight:2px;
            
            
            /*
            * bottom task bar
            */
            
            --bottom-bar-height: 73px;
            
            /*
            * Iris-chips
            */
            
            --icon-width: 24px;
            --iris-chips-padding: 5px;
            
            /*
            * Iris-input-chips
            */
            
            --icon-margin: 1px;
            --iris-input-chips-max-height: calc(calc(calc(var(--icon-margin) * 2) + calc(var(--icon-width) + calc(var(--iris-chips-padding) * 2))) * 3);
            
            /*
            * Iris-queryline
            */
            /*the height of queryline must be of 1 chipslist more it padding more padding of queryContainer wrapper iside of element*/
            
            --query-container-padding: 10px;
            --queryline-padding: 5px;
            --queryline-height: calc(calc(var(--icon-margin) * 2) + var(--icon-width) + calc(calc(var(--queryline-padding) * 2) + calc(var(--queryline-container-padding) * 2)));
            
            
      }

    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer);
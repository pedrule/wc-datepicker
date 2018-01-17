import '@polymer/iron-iconset-svg/iron-iconset-svg';


const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<iron-iconset-svg name="rd-datepicker-icons" size="100">
<svg>
    <defs>
        <g id="chevron" viewBox="0 0 8 5">
            <polygon class="st0" points="6.9,0 4,2.8 1.1,0 0,1.1 2.9,3.9 2.9,3.9 4,5 8,1.1 "/>
        </g>
        <g id="point"><circle cx="50" cy="50" r="50"></circle></g>
        <g id="close" viewBox="0 0 8.4 8.4"><polygon class="st0" points="8.4,1.4 7,0 4.2,2.8 1.4,0 0,1.4 2.8,4.2 0,7 1.4,8.4 4.2,5.6 7,8.4 8.4,7 5.6,4.2 "/></g>
        <g id="chevron_datepicker" viewBox="0 0 5.906 11">
            <path  d="M671.729,551.989l-0.74-.784,5.183-5.489,0.741,0.784Zm-0.74-10.194,0.74-.784,5.184,5.489-0.741.784Z" transform="translate(-671 -541)"/>
        </g>
        
        <g id="double_chevron_datepicker" viewBox="0 0 12 11">
            <path id="double_chevron_date_picjer.svg" class="cls-1" d="M708.806,551.989l-0.74-.784,5.183-5.489,0.74,0.784Zm-0.74-10.194,0.74-.784,5.183,5.489-0.74.784Zm-5.337,10.194-0.74-.784,5.183-5.489,0.741,0.784Zm-0.74-10.194,0.74-.784,5.184,5.489-0.741.784Z" transform="translate(-702 -541)"/>
        </g>
    </defs>
</svg>
</iron-iconset-svg>
<iron-iconset-svg size="24" name="datepicker">
    <svg><defs>
    <g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></g>
    <g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g>
    </defs></svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer);
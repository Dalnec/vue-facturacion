<template>
  <svg
    :class="$props.class"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    viewBox="0 0 30 30"
    version="1.1"
    id="svg822"
    inkscape:version="0.92.4 (f8dce91, 2019-08-02)"
    sodipodi:docname="battery-unknown.svg"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <defs id="defs816"></defs>
      <sodipodi:namedview
        id="base"
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1.0"
        inkscape:pageopacity="0.0"
        inkscape:pageshadow="2"
        inkscape:zoom="22.627417"
        inkscape:cx="13.789051"
        inkscape:cy="11.922035"
        inkscape:document-units="px"
        inkscape:current-layer="layer1"
        showgrid="true"
        units="px"
        inkscape:window-width="1366"
        inkscape:window-height="713"
        inkscape:window-x="0"
        inkscape:window-y="0"
        inkscape:window-maximized="1"
      >
        <inkscape:grid type="xygrid" id="grid816"></inkscape:grid>
      </sodipodi:namedview>

      <g
        inkscape:label="Layer 1"
        inkscape:groupmode="layer"
        id="layer1"
        transform="translate(0,-289.0625)"
      >
        <path
          style="
            fill: #eb0000;
            fill-opacity: 1;
            stroke: none;
            stroke-width: 0.49999997;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          d="M 15.1875 6.8847656 C 13.074169 6.8847656 11.344847 7.6745554 10 9.2558594 L 12.238281 10.984375 C 13.036322 10.082884 13.900983 9.6328125 14.832031 9.6328125 C 15.319723 9.6328125 15.696877 9.7431656 15.962891 9.9648438 C 16.243683 10.186522 16.384766 10.497464 16.384766 10.896484 C 16.384766 11.221612 16.281118 11.495119 16.074219 11.716797 C 15.867319 11.938475 15.541012 12.196617 15.097656 12.492188 C 14.639521 12.817315 14.255662 13.119598 13.945312 13.400391 C 13.649742 13.666404 13.3916 14.043558 13.169922 14.53125 C 12.963022 15.004163 12.859375 15.588612 12.859375 16.283203 L 12.859375 16.970703 L 16.052734 16.970703 L 16.052734 16.416016 C 16.052734 15.913545 16.191864 15.507615 16.472656 15.197266 C 16.753449 14.872138 17.190108 14.510349 17.78125 14.111328 C 18.268942 13.756643 18.659507 13.445701 18.955078 13.179688 C 19.250649 12.913674 19.502085 12.56725 19.708984 12.138672 C 19.930662 11.710094 20.042969 11.191858 20.042969 10.585938 C 20.042969 9.9061246 19.857745 9.286194 19.488281 8.7246094 C 19.118818 8.1630248 18.565099 7.7196592 17.826172 7.3945312 C 17.102023 7.0546248 16.221998 6.8847656 15.1875 6.8847656 z M 4.2011719 10 C 3.4376548 11.52361 3 13.21267 3 15 C 3 16.78732 3.4376548 18.47639 4.2011719 20 L 9 20 L 9 19 L 5 19 L 5 11 L 9 11 L 9 10 L 4.2011719 10 z M 21 10 L 21 11 L 24 11 L 24 19 L 21 19 L 21 20 L 24.234375 20 C 24.57508 19.371691 24.838522 18.697349 25.046875 18 L 26.607422 18 C 26.854736 17.039788 27 16.037732 27 15 C 27 13.962268 26.854736 12.960212 26.607422 12 L 25.046875 12 C 24.838522 11.302651 24.57508 10.628309 24.234375 10 L 21 10 z M 14.5 18.988281 C 13.953194 18.988281 13.481052 19.186917 13.082031 19.585938 C 12.697789 19.97018 12.505859 20.435616 12.505859 20.982422 C 12.505859 21.544006 12.697789 22.024808 13.082031 22.423828 C 13.481052 22.80807 13.953194 23 14.5 23 C 15.046806 23 15.512242 22.80807 15.896484 22.423828 C 16.295505 22.024808 16.496094 21.544006 16.496094 20.982422 C 16.496094 20.435616 16.295505 19.97018 15.896484 19.585938 C 15.512242 19.186917 15.046806 18.988281 14.5 18.988281 z "
          transform="translate(0,289.0625)"
          id="rect850"
        ></path>
      </g>
    </g>
  </svg>
</template>
<script setup lang="ts">
interface Props {
  class?: string
}
withDefaults(defineProps<Props>(), {
  class: 'w-6 h-6',
})
</script>

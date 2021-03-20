import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faUsers,
  faSun,
  faMoon,
  faChevronLeft,
  faChevronRight,
  faWindowClose,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUser);
library.add(faUsers);
library.add(faSun);
library.add(faMoon);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faWindowClose);
library.add(faWindowMinimize);

Vue.component('font-awesome-icon', FontAwesomeIcon);

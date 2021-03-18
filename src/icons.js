import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faUsers,
  faSun,
  faMoon
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUser);
library.add(faUsers);
library.add(faSun);
library.add(faMoon);

Vue.component('font-awesome-icon', FontAwesomeIcon);

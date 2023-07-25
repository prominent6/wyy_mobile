import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import getVant from "./plugins";
import "vant/lib/index.css"; //Swipe插件的样式
const app = createApp(App);
getVant(app);
app.use(store);
app.use(router).mount("#app");
/* //其余函数组件样式
// Toast
import { Toast } from "vant";
import "vant/es/toast/style";

// Dialog
import { Dialog } from "vant";
import "vant/es/dialog/style";

// Notify
import { Notify } from "vant";
import "vant/es/notify/style";

// ImagePreview
import { ImagePreview } from "vant";
import "vant/es/image-preview/style"; */

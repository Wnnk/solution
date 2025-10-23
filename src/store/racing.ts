import { ref } from 'vue'
import axios from 'axios'


 export class RacingStore {
  controller = null;
  view = ref({
    status: 0,
    page: 1,
    data: []
  })
  actions = null;
  constructor(actions) {
    this.actions = actions;
    setTimeout(() => {
      this.getPage(1);
    },0)
  }

  getPage(page: number) {
    this.load({ page });
  }

  async load(params: any) {
    try {
      this.view.value.status = 1;
      this.controller?.abort();
      this.controller = new AbortController();
      const signal = this.controller.signal;
      const { data } = await axios({
        url: this.actions.read.url,
        method: this.actions.read.method,
        params,
        signal
      });
      this.controller = null;
      if(data.status === 200) {
        this.view.value.data = data.data;
      } else {
        throw new Error('解析错误');
      }
      this.view.value.page = data.page;
      this.view.value.status = 2;
    } catch (error) {
      if(this.controller.signal.aborted) {
        this.view.value.status = 3;
        this.controller = null;
      }
      throw new Error(error);
    }
  }

  async save() {
    if(this.view.value.status === 1) {
      return;
    }

    try {
      this.view.value.status = 1;
      const { data } = await axios({
        url: this.actions.save.url,
        method: this.actions.save.method,
        params: this.view.value.data,
      });
      if(data.status === 200) {
        this.view.value.status = 2;
        if(data.data){
          this.view.value.data = data.data;
        }
      } else {
        throw new Error('保存失败');
      }
    } catch (error) {
      this.view.value.status = 3;
      throw new Error(error);
    }
  }
}
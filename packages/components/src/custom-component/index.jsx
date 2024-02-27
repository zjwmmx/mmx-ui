import { defineComponent, ref, reactive, toRefs } from "vue";
import "./styles.scss";
import {
  createGlobalState,
  useStorage,
  useRefHistory,
  useFileDialog,
  useFullscreen,
} from "@vueuse/core";
import { OnClickOutside } from "@vueuse/components";
import { Button, Input } from "ant-design-vue";
import _ from 'lodash'
// import { Button, Input } from 'naive-ui'

const CustomComponent = defineComponent({
  name: "CustomComponent",
  setup: () => {
    const useState = createGlobalState(() =>
      useStorage("vue-use-locale-storage", {
        name: "Banana",
        color: "Yellow",
        size: "Medium",
      })
    );
    console.log(
      useStorage("333", {
        name: "Banadwdwna",
        color: "ddww",
        size: "Medium",
      })
    );
    
    const state = useState();

    const a = toRefs({
      a: 2,
    });

    const b = reactive(a);

    const text = ref('')

    console.log("1222", b.a);
    console.log("1222sss", a);

    function close(e) {
      console.log(e);
      /* ... */
    }

    const counter = ref("0");
    const { history, undo, redo } = useRefHistory(counter);

    const { files, open, reset } = useFileDialog();

    const el = ref(null);
    const { isFullscreen, enter, exit, toggle } = useFullscreen(el);


    const generate = () => {
      console.log(_.chain(text.value).trim().split('\n').value().map(item => {
        const data = item
          .split(/\t|([ ]+)/)
          .filter(Boolean)
          .map((item) => item.trim())
          .filter(Boolean)
          return data
      }))
      console.log(text.value)
    }

    return () => {
      console.log(history);
      console.log(files);
      return (
        <div class={'wrap'}>
          {/* <OnClickOutside onTrigger={close}>
            <div>Click Outside of Me</div>
          </OnClickOutside> */}
          {/* 历史记录回退和前进 */}
          {/* <div>{counter.value}</div>
          <Input v-model:value={counter.value} placeholder="请输入"></Input>
          <Button onClick={undo}>undo</Button>
          <Button onClick={redo}>redo</Button> */}
          {/* 打开文件弹窗 */}
          {/* <Button onClick={open}>open file</Button> */}

          <div class='elli'>卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔卑微仔</div>
          <Input.TextArea v-model:value={text.value}></Input.TextArea>
          <Button onClick={generate}>generate</Button>
          
          {/* 视频全屏 */}
          {/* <video ref="el" src="https://vjs.zencdn.net/v/oceans.mp4" controls></video> */}
        </div>
      );
    };
  },
});

export default CustomComponent;

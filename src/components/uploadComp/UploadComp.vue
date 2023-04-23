<template>
  <div class="upload">
    <el-upload
      name="upload"
      list-type="picture-card"
      ref="uploadRef"
      :data="extraData"
      :action="fileUrl"
      :show-file-list="true"
      :file-list="fileList"
      :limit="imgLength"
      :accept="format.toString()"
      :auto-upload="true"
      :on-exceed="handleExceed"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :with-credentials="true"
    >
      <template #default>
        <el-icon><Plus /></el-icon>
      </template>
      <template #file="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <!-- <p>{{ file.url }}</p> -->
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file, file.url)"
          >
            <el-icon><ZoomIn /></el-icon>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible" title="预览" center>
      <img width="100%" :src="dialogImageUrl" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import {
  defineComponent,
  unref,
  ref,
  reactive,
  toRefs,
  toRaw,
  getCurrentInstance,
  watch,
} from "vue";
import {Plus, ZoomIn, Delete} from "@element-plus/icons-vue"
interface Props {
  [key: string]: any;
}
interface Slots {
  [key: string]: unknown;
}
interface SetupContext {
  attrs: Props;
  slots: Slots;
  emit: (event: string, ...args: unknown[]) => void;
}

export default defineComponent({
  name: "UploadComp",
  components: {Plus, ZoomIn, Delete},
  props: {
    // upload 动态
    uploadObj: {
      type: Object,
      // 当为对象类型设置默认值时必须使用函数返回
      default: () => {
        // 默认参数
        return {
          defaultfilelist: [],
          // defaultfilelist: null,
        };
      },
    },

    // 图片最大数量
    imgLength: {
      type: Number,
      default: 5,
    },
    // 文件上传地址
    fileUrl: {
      type: [Function, String],
    },
    // 图片最大质量
    maxSize: {
      type: Number,
      default: 5,
    },
    // 文件格式
    format: {
      type: Array,
      default: () => ["image/jpg", "image/jpeg", "image/png"],
    },
    extraData: {
      type: Object,
      default: function () {
        // 默认参数
        return {
          region: "cn",
        };
      },
    },
  },
  setup(props: Props, context: SetupContext) {
    const store = useStore();
    // const eventBus = getCurrentInstance()?.appContext.config.globalProperties
    //   .eventBus;
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);
    const uploadRef: any = ref(null);
    const { fileUrl, imgLength, format, maxSize, extraData } = toRefs(props);
    const bol = ref(true); //兼容上传 数据刷新页面不展示

    const sendFileList: any = ref([]); // 发出去的数据列表
    const state = reactive({
      fileList: [],
    });
    watch(
      () => props.uploadObj.defaultfilelist,
      (val) => {
        sendFileList.value = state.fileList = val;
      },
      { immediate: true }
    );

    // sendFileList.value.push(...toRaw(state.fileList));

    // 删除图片
    const handleRemove = (file: any) => {
      let delurl = file?.response?.url || file?.url;
      let fileList = toRaw(sendFileList.value).filter((item: any) => {
        return item.url != delurl;
      });
      uploadRef.value.handleRemove(file);
      context.emit("fileUrlInfo", fileList);
    };

    const handlePictureCardPreview = (file: any) => {
      dialogImageUrl.value = unref(file).url;
      dialogVisible.value = true;
    };

    const handleAvatarSuccess = (res: any | never, file: { raw: any }) => {
      if (!res.code) {
        dialogImageUrl.value = URL.createObjectURL(file.raw);
        sendFileList.value.push(res);
        context.emit("fileUrlInfo", sendFileList.value);
        ElMessage.success("上传成功");
        // eventBus.$emit("uploadEnd", true);
      } else {
        ElMessage.error("上传失败");
        // eventBus.$emit("uploadEnd", false);
      }
      // store.commit("setLoading", false);
      store.state.loading = false
    };
    const beforeAvatarUpload = (file: { type: string; size: number }) => {
      console.log("beforeAvatarUpload：", file, file.type, format.value);
      // store.commit("setLoading", true);
      store.state.loading = true
      const isJPG = format.value.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < maxSize.value;

      if (!isJPG) {
        return ElMessage.error("上传图片格式错误!");
      }
      if (!isLt2M) {
        return ElMessage.error(`上传头像图片大小不能超过 ${maxSize.value}MB!`);
      }

      // eventBus.$emit("uploadIng");
    };

    const handleDownload = () => {
      console.log("DownLoad");
    };

    const handleExceed = () => {
      return ElMessage.warning(` 文件数量不得超过 ${imgLength.value} 个`);
    };

    return {
      ...toRefs(state),
      dialogImageUrl,
      dialogVisible,
      uploadRef,
      handleRemove,
      handlePictureCardPreview,
      handleAvatarSuccess,
      beforeAvatarUpload,
      handleDownload,
      format,
      fileUrl,
      imgLength,
      bol,
      handleExceed,
      extraData,
    };
  },
});
</script>

<style>
.demo-upload-list {
  display: inline-block;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.el-upload--picture-card {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 80px;
  height: 80px;
}
</style>

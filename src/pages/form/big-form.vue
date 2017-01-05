<template>
  <div id="big-form">
    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <div class="db-content-inner">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
            <el-input placeholder="请输入您的姓名" v-model="form.baseInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.baseInfo.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日">
          <el-date-picker
            v-model="form.baseInfo.birthday"
            type="date"
            placeholder="请输入您的生日">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="工作年限">
          <el-select v-model="form.baseInfo.workDuration" placeholder="请选择">
            <el-option
              v-for="option in workDurationOptions"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="最高学历">
          <el-select v-model="form.baseInfo.academic" placeholder="请选择">
            <el-option
              v-for="option in academicOptions"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学校">
          <el-autocomplete
            v-model="form.baseInfo.school"
            :fetch-suggestions="getSchoolsInfo"
            placeholder="请输入您的学校"
            @select="handleSelectSchool"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item label="专业">
          <el-autocomplete
            v-model="form.baseInfo.major"
            :disabled="!form.baseInfo.school"
            :fetch-suggestions="getMajorsInfo"
            placeholder="请输入您的专业"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item label="在职公司">
          <el-input placeholder="请输入您目前所在的公司名称" v-model="form.baseInfo.company"></el-input>
        </el-form-item>

        <el-form-item label="职位">
          <el-input placeholder="请输入您的职位名称" v-model="form.baseInfo.position"></el-input>
        </el-form-item>

        <el-form-item label="城市">
          <el-input placeholder="请输入您意向的工作地点" v-model="form.baseInfo.city"></el-input>
        </el-form-item>

        <el-form-item label="联系方式">
          <el-input placeholder="请输入您的联系方式" v-model="form.baseInfo.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input placeholder="请输入您的邮箱" v-model="form.baseInfo.email"></el-input>
        </el-form-item>

        <el-form-item label="网站">
          <el-input placeholder="请输入您的个人博客" v-model="form.baseInfo.website">
            <template slot="prepend">http://</template>
          </el-input>
        </el-form-item>

        <el-form-item label="技能">
          <el-row class="skill-line" v-for="(skill, index) in form.baseInfo.skills" type="flex" align="middle">
            <el-col :span="3" v-if="!isSkillEdit">{{skill.name}}</el-col>
            <el-col :span="3" v-if="isSkillEdit">
              <el-input v-model="skill.name" placeholder="请输入技能"></el-input>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-slider v-model="skill.value"></el-slider>
            </el-col>
            <el-col :span="2" :offset="1" v-if="isSkillEdit">
              <el-button type="primary" icon="delete" @click="deleteSkill(index)"></el-button>
            </el-col>
          </el-row>
          <el-row class="add-skill-btn">
            <el-button type="primary" icon="plus" @click="addSkill">添加技能</el-button>
            <template v-if="isSkillEdit">
              <el-button type="primary" icon="edit" @click="saveSkill">保存</el-button>
              <el-button icon="close" @click="cancelSaveSkill">取消</el-button>
            </template>
          </el-row>
        </el-form-item>

        <el-form-item label="个人简历">
          <el-upload
            action="/resume"
            type="drag"
            accept="pdf"
            :before-upload="uploadResume"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="handleError"
            :default-file-list="resume">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过5M</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import {
  fetchSchoolList,
  fetchWorkDurationOptions,
  fetchAcademicOptions,
  postResume,
  postSuccess
} from '../../api/api';

export default {
  data() {
    return {
      form: {
        baseInfo: {
          name: '',
          school: '',
          major: '',
          company: '',
          position: '',
          gender: '',
          birthday: '',
          workDuration: null,
          academic: null,
          city: '',
          phone: '',
          email: '',
          website: '',
          skills: [],
          resumeId: ''
        }
      },
      schoolList: [],
      selectedSchoolId: null,
      workDurationOptions: [],
      academicOptions: [],
      isSkillEdit: false,
      prevSkills: [],
      resume: []
    };
  },
  mounted() {
    this.getSchoolList();
    this.getWorkDurationOptions();
    this.getAcademicOptions();
  },
  methods: {
    // get data from server
    getSchoolList() {
      fetchSchoolList().then(data => {
        let { code, school_list } = data;
        if (code === 200) {
          school_list.forEach(school => {
            school.value = school.name;
            school['major_list'].forEach(major => { major.value = major.name; });
          });
          this.schoolList = school_list;
          this.selectedSchoolId = school_list[0] ? school_list[0].id : null;
        }
      });
    },
    getWorkDurationOptions() {
      fetchWorkDurationOptions().then(data => {
        let { code, workDurationOptions } = data;
        if (code === 200) {
          this.workDurationOptions = workDurationOptions;
        }
      });
    },
    getAcademicOptions() {
      fetchAcademicOptions().then(data => {
        let { code, academicOptions } = data;
        if (code === 200) {
          this.academicOptions = academicOptions;
        }
      });
    },

    // event
    getSchoolsInfo(query, cb) {
      let schoolList = this.schoolList.filter(school => school.name.indexOf(query) > -1);
      cb(schoolList);
    },
    getMajorsInfo(query, cb) {
      let majorList = this.majorList.filter(major => major.name.indexOf(query) > -1);
      cb(majorList);
    },
    handleSelectSchool(item) {
      this.selectedSchoolId = item.id;
    },
    addSkill() {
      this.prevSkills = JSON.parse(JSON.stringify(this.form.baseInfo.skills));
      this.isSkillEdit = true;
      this.form.baseInfo.skills.push({name: '', value: 0});
    },
    saveSkill() {
      this.isSkillEdit = false;
    },
    cancelSaveSkill() {
      this.isSkillEdit = false;
      this.form.baseInfo.skills = this.prevSkills;
    },
    deleteSkill(index) {
      this.form.baseInfo.skills.splice(index);
    },
    handleRemove(file, fileList) {
      console.log('handleRemove');
    },
    handlePreview(file) {
      console.log('handlePreview');
      console.log(file);
    },
    handleSuccess() {
      console.log('success');
    },
    handleError() {
      console.log('error');
    },
    uploadResume() {
      postResume({data: this.resume[0]}).then(data => {
        let {code, msg, resume_id} = data;
        if (code === 200) {
          this.form.baseInfo.resumeId = resume_id;
        } else {
          this.$message.error(msg);
        }
      });
      return false;
    },
    submit() {
      postSuccess(this.form).then(() => {
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      });
    }
  },
  computed: {
    majorList() {
      if (this.schoolList.length === 0 || !this.selectedSchoolId) return [];
      return this.schoolList.filter(school => school.id === this.selectedSchoolId)[0]['major_list'];
    }
  }
};
</script>

<style lang="scss" scoped>
#big-form {
  .el-form {
    width: 600px;

    .skill-line {
      margin: 10px 0;
    }
  }
}
</style>

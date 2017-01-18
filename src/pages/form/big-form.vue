<template>
  <div id="big-form">
    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <div class="db-content-inner">
      <el-form :rules="rules" ref="form" :model="form" label-width="100px">
        <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入您的姓名" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="请输入您的生日">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="工作年限" prop="workDuration">
          <el-select v-model="form.workDuration" placeholder="请选择">
            <el-option
              v-for="option in workDurationOptions"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="最高学历" prop="academic">
          <el-select v-model="form.academic" placeholder="请选择">
            <el-option
              v-for="option in academicOptions"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学校" prop="school">
          <el-autocomplete
            v-model="form.school"
            :fetch-suggestions="getSchoolsInfo"
            placeholder="请输入您的学校"
            @select="handleSelectSchool"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item label="专业" prop="major">
          <el-autocomplete
            v-model="form.major"
            :disabled="!form.school"
            :fetch-suggestions="getMajorsInfo"
            placeholder="请输入您的专业"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item label="在职公司" prop="company">
          <el-input placeholder="请输入您目前所在的公司名称" v-model="form.company"></el-input>
        </el-form-item>

        <el-form-item label="职位" prop="position">
          <el-input placeholder="请输入您的职位名称" v-model="form.position"></el-input>
        </el-form-item>

        <el-form-item label="城市" prop="city">
          <el-input placeholder="请输入您意向的工作地点" v-model="form.city"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="phone">
          <el-input placeholder="请输入您的联系方式" v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入您的邮箱" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="网站" prop="website">
          <el-input placeholder="请输入您的个人博客" v-model="form.website">
            <template slot="prepend">http://</template>
          </el-input>
        </el-form-item>

        <el-form-item label="技能" prop="skills">
          <el-row class="skill-line" v-for="(skill, index) in form.skills" type="flex" align="middle">
            <el-col :span="5">
              <el-input v-model="skill.name" placeholder="请输入技能"></el-input>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-slider v-model="skill.value"></el-slider>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button type="primary" icon="delete" @click="deleteSkill(index)"></el-button>
              <el-button type="primary" icon="plus" @click="addSkill" v-if="index === form.skills.length - 1"></el-button>
            </el-col>
          </el-row>
          <el-row v-if="form.skills.length <= 0">
            <el-col :span="6" :offset="1">
              <el-button type="primary" icon="plus" @click="addSkill">添加技能</el-button>
            </el-col>
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
          <el-button @click="reset">重置</el-button>
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
  createResume
} from '../../api/api';

export default {
  data() {
    return {
      form: {
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
      },
      schoolList: [],
      selectedSchoolId: null,
      workDurationOptions: [],
      academicOptions: [],
      resume: [],
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        school: [
            {required: true, message: '请选择学校', trigger: 'change'}
        ],
        major: [
            {required: true, message: '请选择专业', trigger: 'change'}
        ],
        company: [
            {required: true, message: '请输入公司', trigger: 'blur'}
        ],
        position: [
            {required: true, message: '请输入职位', trigger: 'blur'}
        ],
        gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
        ],
        birthday: [
            {type: 'date', required: true, message: '请输入生日', trigger: 'change'}
        ],
        workDuration: [
            {type: 'number', required: true, message: '请选择工作年限', trigger: 'change'}
        ],
        academic: [
            {type: 'number', required: true, message: '请选择学历', trigger: 'change'}
        ],
        city: [
            {required: true, message: '请输入意向城市', trigger: 'blur'}
        ],
        phone: [
            {required: true, message: '请输入联系方式', trigger: 'blur'}
        ],
        email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        website: [
            {required: true, message: '请输入网站', trigger: 'blur'}
        ],
        skills: [
          {type: 'array', required: true, message: '请至少输入一条技能', trigger: 'blur'}
        ]
      }
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
      this.form.skills.push({name: '', value: 0});
    },
    saveSkill() {

    },
    deleteSkill(index) {
      this.form.skills.splice(index, 1);
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleSuccess() {
    },
    handleError() {
    },
    uploadResume() {
      postResume({data: this.resume[0]}).then(data => {
        let {code, msg, resume_id} = data;
        if (code === 200) {
          this.form.resumeId = resume_id;
        } else {
          this.$message.error(msg);
        }
      });
      return false;
    },
    reset() {
      this.$refs.form.resetFields();
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        } else {
          console.log(JSON.parse(JSON.stringify(this.form)));
          createResume(this.form).then(() => {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
          });
        }
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

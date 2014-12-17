'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the well-made' + chalk.red('TrmsLaravel') + ' generator!'
    ));


    var prompts = [
    {
      type: 'confirm',
      name: 'clean',
      message: 'Would you like to Begin?',
      default: true
    },
    {
      type: 'input',
      name:'projectname',
      message: 'What is this project\'s name?',
      default:''
    },
    {
      type: 'input',
      name: 'username',
      message: 'What is your Github username?',
      default:'',
      store: true
    },
    {
      type: 'input',
      name: 'repo',
      message:'What is the URL for this projects repo?',
      default:'',
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What Features Do You Need?',
      choices: [
        {
          name: 'Admin Section',
          value: 'admin',
          checked: true,
          store: true
        },
        {
          name: 'User Section',
          value: 'users',
          checked: true,
          store: true
        },
        {
          name: 'Backup Feature',
          value: 'backup',
          checked: true,
          store: true
        },
      ]
    }
    ];


    // this.prompt(prompts, function (props) {
      
    //   this.projectname = props.projectname;
    //   this.username = props.username;
    //   this.repo = props.repo;

    //   function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    //   this.includeAdmin = hasFeature('admin');
    //   this.includeUsers = hasFeature('users');
    //   this.includeBackup = hasFeature('backup');

    //   this.clean = props.clean;

    //   done();
    // }.bind(this));
    done();
  },

//default time
  fetchLaravel: function(){

    var cb = this.async();

    this.remote('laravel', 'laravel', 'v4.2.0', function (err, remote) {
        if (err) {
            return cb(err);
        }
        remote.directory('.', '.');
        cb();
    },true);
      
  },

  stubIndex: function(){
    
    this.fs.copyTpl(
      this.templatePath('views/layouts/index.blade.php'),
      this.destinationPath('app/views/layouts/index.blade.php'),
      {
        projectname:this.projectname
      }
    );

    this.fs.copyTpl(
      this.templatePath('style/main.scss'),
      this.destinationPath('app/style/main.scss')
    );


  },

  stubAdmin: function(){
    
    if(!this.includeAdmin) return false;

    this.fs.copyTpl(
      this.templatePath('views/layouts/admin.blade.php'),
      this.destinationPath('app/views/layouts/admin.blade.php'),
      {
        projectname:this.projectname
      }
    );

    this.fs.copyTpl(
      this.templatePath('views/layouts/adminPageTemplate.blade.php'),
      this.destinationPath('app/views/layouts/adminPageTemplate.blade.php')
    );

    this.fs.copyTpl(
      this.templatePath('views/includes/flash.blade.php'),
      this.destinationPath('app/views/includes/flash.blade.php')
    );

    this.fs.copyTpl(
      this.templatePath('views/includes/search.blade.php'),
      this.destinationPath('app/views/includes/search.blade.php')
    );

    this.fs.copyTpl(
      this.templatePath('style/admin.scss'),
      this.destinationPath('app/style/admin.scss')
    );

  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    gruntfile: function(){

      this.fs.copy(
        this.templatePath('gruntfile.js'),
        this.destinationPath('gruntfile.js')
      );
      // this.gruntfile.insertConfig("sass", "{dist: { options: { style: 'expanded' }, files: {'public/style/main.css': 'app/style/main.scss'} } }");

      // this.gruntfile.insertConfig("concat","{options: {separator: ';',},dist: {src: ['bower_components/jquery/dist/jquery.js',],dest: 'public/js/vendor.js',},admin: {src: ['bower_components/jquery/dist/jquery.js',],dest: 'public/js/adminVendor.js',},}");

      // this.gruntfile.insertConfig("concat-css","{options: {},dist: {src: [],dest: 'public/js/vendor.css',},admin: {src: ['bower_components/bootstrap/dist/css/bootstrap.css','bower_components/bootstrap/dist/css/bootstrap-theme.css','bower_components/Bootstrap-Admin-Theme-3/css/styles.css'],dest: 'public/js/adminVendor.css',},}");

      // this.gruntfile.insertConfig('watch',"{scripts: {files: ['public/**/*.js','public/**/*.css','app/views/**/*'],tasks: ['sass'],options: {livereload:true} } }");

      // this.gruntfile.insertConfig('uglify',"{options: {banner: '/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n'},build: {src: '<%= concat.dist.dest %>',dest: '<%= concat.dist.dest %>'}}");

      // this.gruntfile.registerTask('default', ['watch']);
      // this.gruntfile.registerTask('combine',['concat','concat_css']);
      // this.gruntfile.registerTask('minnify',['uglify']);


    }

  },

  install: function () {
     
      this.installDependencies({
        skipInstall: this.options['skip-install']
      });

      this.on('dependenciesInstalled', function () {
     
    
      });
        this.spawnCommand('grunt',['combine']);
    
  }
});

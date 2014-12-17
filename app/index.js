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
      type: 'input',
      name: 'databasename',
      message:'What is the name of the Database?',
      default:'',
    },
    {
      type: 'input',
      name: 'databaseuser',
      message:'Database User Name?',
      default:'',
      store: true
    },
    {
      type: 'input',
      name: 'databasepassword',
      message:'Database Password?',
      default:'',
      store:true
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


    this.prompt(prompts, function (props) {
      
      this.projectname = props.projectname;
      this.username = props.username;
      this.repo = props.repo;
      this.databasename = props.databasename;
      this.databaseuser = props.databaseuser;
      this.databasepassword = props.databasepassword;

      function hasFeature(feat) { return props.features.indexOf(feat) !== -1; }

      this.includeAdmin = hasFeature('admin');
      this.includeUsers = hasFeature('users');
      this.includeBackup = hasFeature('backup');


      this.clean = props.clean;

      done();
    }.bind(this));
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
      this.templatePath('app/views/layouts/index.blade.php'),
      this.destinationPath('app/views/layouts/index.blade.php'),
      {
        projectname:this.projectname
      }
    );

    this.fs.copyTpl(
      this.templatePath('app/style/main.scss'),
      this.destinationPath('app/style/main.scss')
    );

    this.fs.copyTpl(
      this.templatePath('app/routes.php'),
      this.destinationPath('app/routes.php'),
      {
        includeAdmin: this.includeAdmin,
        includeUsers: this.includeUsers,
        includeBackup: this.includeBackup
      }
    );

    this.fs.copyTpl(
      this.templatePath('app/config/database.php'),
      this.destinationPath('app/config/database.php'),
      {
        databasename: this.databasename,
        databaseuser: this.databaseuser,
        databasepassword: this.databasepassword
      }
    );


  },

  stubAdmin: function(){
    
    if(!this.includeAdmin) return false;

    this.fs.copyTpl(
      this.templatePath('app/views/layouts/admin.blade.php'),
      this.destinationPath('app/views/layouts/admin.blade.php'),
      {
        projectname:this.projectname,
        includeAdmin: this.includeAdmin,
        includeUsers: this.includeUsers,
        includeBackup: this.includeBackup
      
      }
    );

    this.fs.copyTpl(
      this.templatePath('app/views/layouts/adminPageTemplate.blade.php'),
      this.destinationPath('app/views/layouts/adminPageTemplate.blade.php')
    );

    this.fs.copyTpl(
      this.templatePath('app/views/includes/flash.blade.php'),
      this.destinationPath('app/views/includes/flash.blade.php')
    );

    this.fs.copyTpl(
      this.templatePath('app/views/includes/search.blade.php'),
      this.destinationPath('app/views/includes/search.blade.php')
    );

    this.fs.copyTpl(
      this.templatePath('app/style/admin.scss'),
      this.destinationPath('app/style/admin.scss')
    );

  },

  stubUsers: function(){

    if(!this.includeUsers) return false;

    // controllers for user and auth
    this.fs.copyTpl(
      this.templatePath('app/controllers/AuthController.php'),
      this.destinationPath('app/controllers/AuthController.php')
    );
    this.fs.copyTpl(
      this.templatePath('app/controllers/UserController.php'),
      this.destinationPath('app/controllers/UserController.php')
    );
    this.fs.copyTpl(
      this.templatePath('app/controllers/RemindersController.php'),
      this.destinationPath('app/controllers/RemindersController.php')
    );

    // database migration and seed
    this.fs.copyTpl(
      this.templatePath('app/database/migrations/2014_10_12_000000_create_users_table.php'),
      this.destinationPath('app/database/migrations/2014_10_12_000000_create_users_table.php')
    );
    this.fs.copyTpl(
      this.templatePath('app/database/migrations/2014_10_12_100000_create_password_reminders_table.php'),
      this.destinationPath('app/database/migrations/2014_10_12_100000_create_password_reminders_table.php')
    );
    this.fs.copyTpl(
      this.templatePath('app/database/seeds/DatabaseSeeder.php'),
      this.destinationPath('app/database/seeds/DatabaseSeeder.php')
    );

    // user model
    this.fs.copyTpl(
      this.templatePath('app/models/User.php'),
      this.destinationPath('app/models/User.php')
    );

    // user templates
    this.fs.copyTpl(
      this.templatePath('app/views/users/create.blade.php'),
      this.destinationPath('app/views/users/create.blade.php')
    );
    this.fs.copyTpl(
      this.templatePath('app/views/users/edit.blade.php'),
      this.destinationPath('app/views/users/edit.blade.php')
    );
    this.fs.copyTpl(
      this.templatePath('app/views/users/index.blade.php'),
      this.destinationPath('app/views/users/index.blade.php')
    );
    this.fs.copyTpl(
      this.templatePath('app/views/users/login.blade.php'),
      this.destinationPath('app/views/users/login.blade.php')
    );

    // password reminder templates
    this.fs.copyTpl(
      this.templatePath('app/views/password/remind.blade.php'),
      this.destinationPath('app/views/password/remind.blade.php')
    );
    this.fs.copyTpl(
      this.templatePath('app/views/password/reset.blade.php'),
      this.destinationPath('app/views/password/reset.blade.php')
    );

  },


  stubBackup: function(){
    
    if(!this.includeBackup) return false;

    this.fs.copyTpl(
      this.templatePath('app/controllers/BackupController.php'),
      this.destinationPath('app/controllers/BackupController.php')
    );

    this.fs.copyTpl(
      this.templatePath('app/views/backup/index.blade.php'),
      this.destinationPath('app/views/backup/index.blade.php')
    );

    this.fs.copyTpl(
      this.templatePath('app/config/app.php'),
      this.destinationPath('app/config/app.php')
    );





  },


  writing: {

    app: function () {


      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          username: this.username,
          repo: this.repo,
          projectname: this.projectname
        }
      );

      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {
          projectname: this.projectname
        }
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
        this.destinationPath('gruntfile.js'),
        {
          includeAdmin: this.includeAdmin,
          includeUsers: this.includeUsers,
          includeBackup: this.includeBackup
        }
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
    

      this.spawnCommand('grunt',['combine']);
      
      if(this.includeBackup){
        chalk.green('Requiring schickling/backup via composer');
        this.spawnCommand('composer',['require','schickling/backup'])
      } 
      else{
        chalk.green('Running Composer Install');
        this.spawnCommand('composer',['install']);
      }

  }
});

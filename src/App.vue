<template>
  <div>
    <img id="plan" src="img.png" style="width: 100%; max-width: 1024px;" />
  </div>
</template>

<script>
  import { Annotorious} from '@recogito/annotorious';
  import '@recogito/annotorious/dist/annotorious.min.css';

  export default {
    
    data() {
      return {
        anno: null
      }
    },

    methods: {
      initAnno() {
        this.anno = new Annotorious({
          image: document.getElementById("plan")
        });

        this.anno.on('createAnnotation', function (annotation) {
          console.log('Created annotation', annotation);
        });

        this.anno.on('createSelection', function (selection) {
          console.log('Created selection', selection);
        });

        this.anno.on('deleteAnnotation', function (annotation) {
          console.log('Delete annotation', selection);
        });

        this.anno.on('mouseEnterAnnotation', function (annotation, element) {
          console.log('Mouse ENTERED annotation', annotation);
        });

        this.anno.on('selectAnnotation', function (annotation, element) {
          console.log('Select annotation', annotation);
        });

        this.anno.on('cancelSelected', function (selection) {
          console.log('UNSELECTED');
        });

        this.anno.on('clickAnnotation', function (annotation, element) {
          console.log('Clicked annotation', annotation);
        });
      }
    },

    mounted() {
      this.initAnno();
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

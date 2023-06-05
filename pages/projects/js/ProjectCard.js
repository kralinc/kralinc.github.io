import ProjectTag from "./ProjectTag.js";

export default {
    components: {ProjectTag},
    props: {
        project: Object,
    },
    template: `
    <div class="project row rounded border m-3">
        <div class="col-9">
            <a class="title-link" :href="project.link">{{project.name}}</a>
        </div>
        <div class="col-3">
            <p>{{project.year}}</p>
        </div>
        <div class="col-12">
            <p>{{project.desc}}</p>
        </div>
        <div class="row">
            <project-tag v-for="tag of project.tags" :key="tag.name" :name="tag"></project-tag>
        </div>
    </div>
    `,
}
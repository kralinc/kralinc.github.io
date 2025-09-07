import ProjectTag from "./ProjectTag.js";

export default {
    components: {ProjectTag},
    props: {
        project: Object,
    },
    template: `
    <div class="project col-12 rounded mt-3 p-3">
        <div class="row mb-1">
            <div class="col-9">
                <a class="title-link" :href="project.link">{{project.name}}</a>
            </div>
            <div class="col-3">
                <h5>{{project.year}}</h5>
            </div>
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

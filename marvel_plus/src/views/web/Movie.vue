<template>
    <a-tabs defaultActiveKey="1" tabPosition="left">
        <a-tab-pane tab="正在热映" key="1">
            <movie-hot></movie-hot>
        </a-tab-pane>
        <a-tab-pane tab="即将上映" key="2">
            <movie-coming></movie-coming>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
    import MovieComing from  "./MovieComing";
    import MovieHot from  "./MovieHot";
    export default {
        name: "Movie",
        components:{MovieComing,MovieHot}
    }
</script>


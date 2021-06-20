<template>
    <v-container fluid>
        <v-row
            v-for="item in project_items"
            :key="item.title"
        >
            <v-col
                cols="12"
            >
                <v-card
                    autofill
                    dark
                    color="indigo"
                >
                    <v-card-title
                        class="text-h4"
                    >
                        {{item.title}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{item.intro}}
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script>
export default {
    data () {
        return{
            project_items: [
                {
                    id: "1",
                    title: "helloworld",
                    intro: "start of everything",
                    tag: "hello world begin",
                    importance: "2",
                    deadlineDate: new Date().toISOString().substr(0, 10),
                    deadlineTime: new Date().toISOString().substr(11, 5),
                    taskList: [
                        {
                            value: 'hello'
                        },
                        {
                            value: 'world'
                        }
                    ],
                    highlighted: "0",
                },
                {
                    id: "2",
                    title: "helloworld2",
                    intro: "start of everything",
                    tag: "hello world begin",
                    importance: "2",
                    deadlineDate: new Date().toISOString().substr(0, 10),
                    deadlineTime: new Date().toISOString().substr(11, 5),
                    taskList: [
                        {
                            value: 'hello'
                        },
                        {
                            value: 'world'
                        }
                    ],
                    highlighted: "0",
                },
            ]
        }
    },
    methods: {
    }
}
</script>


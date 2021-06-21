<template>
    <v-container fluid>
        <v-row
        >
            <v-col
                cols="12"
            >
                <v-text-field
                    placeholder="Tag..."
                    outlined
                    id="tagSearch"
                    prepend-inner-icon="mdi-magnify"
                    v-model="searchTag"
                    v-on:change="LoadProjects({tag: searchTag})"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row
            v-if="loadProjectData.length > 0"
        >
            <v-col
                v-for="item in loadProjectData"
                :key="item.title"
                cols="6"
            >
                <v-card
                    autofill
                    dark
                    :color="importanceColor[item.importance]"
                >
                    <v-card-title>
                        <v-container>
                            <v-row
                                :justify="center"
                                :align="center"
                            >
                                <v-col
                                    cols="3"
                                >
                                    <v-container>
                                        <v-row>
                                            <v-text class="text-h4">
                                                {{item.title}}
                                            </v-text>
                                        </v-row>
                                        <v-row>
                                            <v-text class="subtitle-1">
                                            {{item.intro}}

                                            </v-text>

                                        </v-row>
                                    </v-container>
                                    <!-- <v-text
                                        class="text-h4"
                                    >
                                    </v-text>
                                    <v-card-subtitle>
                                    </v-card-subtitle> -->
                                </v-col>
                                <v-col
                                    cols="2"
                                >
                                    <v-dialog
                                        transition="dialog-bottom-transition"
                                        max-width="400"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                outlined
                                                rounded
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                Detail
                                            </v-btn>
                                        </template>
                                        <template v-slot:default="dialog">
                                        <v-card>
                                            <v-toolbar
                                            color="primary"
                                            dark
                                            >Detail of {{item.title}}</v-toolbar>
                                            <v-card-text>
                                                <div>Title: {{item.title}}</div>
                                                <div>Intro: {{item.intro}}</div>
                                                <div>Tag: {{item.tag}}</div>
                                                <div
                                                    v-if="item.importance == 0"
                                                >
                                                    Importance: Low
                                                </div>
                                                <div
                                                    v-else-if="item.importance == 1"
                                                >
                                                    Importance: Medium
                                                </div>
                                                <div
                                                    v-else
                                                >
                                                    Importance: High
                                                </div>
                                                
                                                <div>Deadline: {{item.deadline_date}} {{item.deadline_time}}</div>
                                                <div
                                                    v-for="(task, index) in item.taskList"
                                                    :key="task.title"
                                                >
                                                    Task {{index}}: {{task.destination}}
                                                </div>
                                            </v-card-text>
                                            <v-card-actions class="justify-end">
                                            <v-btn
                                                text
                                                @click="dialog.value = false"
                                            >Close</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                        </template>
                                    </v-dialog>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col
                                    cols="3"
                                >
                                    <!-- {{item.deadline_date}} -->
                                    <v-chip
                                        color="error"
                                        large
                                        class="pa-4"
                                    >
                                        {{leftTime(item)}}
                                    </v-chip>
                                    <!-- <v-text
                                        outlined
                                    >
                                        {{leftTime(item)}}
                                    </v-text> -->
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-title>
                    <!-- <v-text>
                        
                    </v-text> -->
                    <v-progress-linear
                        :value=nowProgress(item)
                        height="10"
                        striped
                        color="amber darken-3"
                    ></v-progress-linear>
                    <v-card
                        light
                        tile
                        elevation="0"
                        height="150"
                    >
                        <v-container fill-height>
                            <v-row></v-row>
                            <v-row
                                :justify="center"
                                :align="center"
                            >
                                <v-col
                                    cols="2"
                                >
                                    <v-btn
                                        color="warning"
                                        dark
                                        block
                                        fill-height
                                    >
                                        <v-icon>mdi-chevron-left</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col
                                    cols="8"
                                    :justify="center"
                                    :align="center"
                                >
                                    <v-sheet
                                        :color="indigo"
                                        height="100%"
                                        tile
                                    >
                                        <v-row
                                            class="fill-height"
                                            align="center"
                                            justify="center"
                                        >
                                        <div class="body-1">
                                            {{item.taskList[item.highlight].destination}}
                                        </div>
                                        </v-row>
                                    </v-sheet>
                                </v-col>
                                <v-col
                                    cols="2"
                                >
                                    <v-btn
                                        color="success"
                                        dark
                                        block
                                        @click="addHighlighted(item)"
                                    >
                                        <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col
                                    cols="12"
                                >
                                    <v-btn
                                        outlined
                                        block
                                        @click="FinishProject(item.id)"
                                    >
                                        Project Finished

                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script>
import {mapState, mapActions} from "vuex";


export default {
    data () {
        return{
            searchTag: "",
            importanceColor: [
                "indigo",
                "pink darken-4",
                "red darken-4"
            ],
            project_items: [
                {
                    id: "1",
                    title: "helloworld",
                    intro: "start of everything",
                    tag: "hello world begin",
                    importance: "2",
                    deadline_date: "2021-06-21",
                    deadline_time: "23:55",
                    taskList: [
                        {
                            destination: 'hello'
                        },
                        {
                            destination: 'world'
                        }
                    ],
                    highlight: "0",
                },
                {
                    id: "2",
                    title: "helloworld2",
                    intro: "start of everything",
                    tag: "hello world begin",
                    importance: "1",
                    deadline_date: "2021-06-30",
                    deadline_time: "23:55",
                    taskList: [
                        {
                            destination: 'hello'
                        },
                        {
                            destination: 'world'
                        },
                        {
                            destination: 'world2'
                        },
                        {
                            destination: 'world3'
                        },
                        {
                            destination: 'world4'
                        }
                    ],
                    highlight: "0",
                },
                {
                    id: "3",
                    title: "helloworld",
                    intro: "start of everything",
                    tag: "hello world begin",
                    importance: "0",
                    deadline_date: "2021-06-30",
                    deadline_time: "23:55",
                    taskList: [
                        {
                            destination: 'hello'
                        },
                        {
                            destination: 'world'
                        },
                        {
                            destination: 'world2'
                        },
                        {
                            destination: 'world3'
                        },
                        {
                            destination: 'world4'
                        }
                    ],
                    highlight: "0",
                },
            ]
        }
    },
    computed: {
        ...mapState([
            "loadProjectData"
        ])
    },
    methods: {
        ...mapActions([
                "LoadProjects",
                "FinishProject"
            ]),

        leftTime: function(item) {
            //var end = new Date(item.deadline_date+"T"+item.deadline_time+":00.000Z");
            var end = new Date(item.deadline_date)
            var now = new Date(+(new Date() - new Date().getTimezoneOffset() * 60000));
            const total = end - now;
            const seconds = Math.floor( (total/1000) % 60 ); 
            const minutes = Math.floor( (total/1000/60) % 60 ); 
            const hours = Math.floor( (total/(1000*60*60)) % 24 ); 
            const days = Math.floor( total/(1000*60*60*24) );
            if(days > 0){
                return days+" Days Remaining";
            }
            else if(hours > 0){
                return hours+" Hours Remaining";
            }
            else if(minutes > 0){
                return minutes+" Minutes Remaining";
            }
            return seconds+" Seconds Remaining";
        },
        nowProgress: function(item) {
            if(item.taskList.length == 0)
                return 100;
            return item.highlight / (item.taskList.length - 1) * 100;
        },
        addHighlighted: function(item) {
            if(item.highlight >= item.taskList.length - 1)
                return;
            item.highlight++;
        },
        subHighlighted: function(item) {
            if(item.highlight <= 0)
                return;
            item.highlight--;
        }
    }
}
</script>


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
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row
        >
            <v-col
                v-for="item in project_items"
                :key="item.title"
                cols="6"
            >
                <v-card
                    autofill
                    dark
                    color="indigo"
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
                                                
                                                <div>Deadline: {{item.deadlineDate}} {{item.deadlineTime}}</div>
                                                <div
                                                    v-for="(task, index) in item.taskList"
                                                    :key="task.title"
                                                >
                                                    Task {{index}}: {{task.value}}
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
                                    <!-- {{item.deadlineDate}} -->
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
                        color="deep-orange"
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
                                            {{item.taskList[item.highlighted].value}}
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
export default {
    data () {
        return{
            searchTag: "",
            project_items: [
                {
                    id: "1",
                    title: "helloworld",
                    intro: "start of everything",
                    tag: "hello world begin",
                    importance: "2",
                    deadlineDate: "2021-06-21",
                    deadlineTime: "23:55",
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
                    deadlineDate: "2021-06-30",
                    deadlineTime: "23:55",
                    taskList: [
                        {
                            value: 'hello'
                        },
                        {
                            value: 'world'
                        },
                        {
                            value: 'world2'
                        },
                        {
                            value: 'world3'
                        },
                        {
                            value: 'world4'
                        }
                    ],
                    highlighted: "0",
                },
                {
                    id: "3",
                    title: "helloworld",
                    intro: "start of everything",
                    tag: "hello world begin",
                    importance: "2",
                    deadlineDate: "2021-06-30",
                    deadlineTime: "23:55",
                    taskList: [
                        {
                            value: 'hello'
                        },
                        {
                            value: 'world'
                        },
                        {
                            value: 'world2'
                        },
                        {
                            value: 'world3'
                        },
                        {
                            value: 'world4'
                        }
                    ],
                    highlighted: "0",
                },
            ]
        }
    },
    computed: {
    },
    methods: {
        leftTime: function(item) {
            var end = new Date(item.deadlineDate+"T"+item.deadlineTime+":00.000Z");
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
            return item.highlighted / (item.taskList.length - 1) * 100;
        },
        addHighlighted: function(item) {
            if(item.highlighted >= item.taskList.length - 1)
                return;
            item.highlighted++;
        },
        subHighlighted: function(item) {
            if(item.highlighted <= 0)
                return;
            item.highlighted--;
        }
    }
}
</script>


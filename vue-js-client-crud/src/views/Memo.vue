<template>
    <v-row
        no-gutters
        height="100%"
    >
        <v-col
            cols = "5"
        >
            <v-card
                auto-fill
            >
                <v-text-field
                    label="Title"
                    id="new_memo_title"
                ></v-text-field> 
                <v-textarea
                    label="Content"
                >
                </v-textarea>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="success"
                        fab
                        outlined
                        @click="AddStuff(memo_data)"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col
            cols = "7"
        >
            <v-container>
                <v-row>
                    <v-col
                        v-for="item in memo_items"
                        :key="item.title"
                        cols="4"
                    >
                        <v-menu
                            absolute
                            offset-y
                            style="max-width: 600px"
                        >
                            <!-- <template v-slot:activator="{ on, attrs }">
                                <v-card
                                class="portrait"
                                img="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
                                height="300"
                                width="600"
                                v-bind="attrs"
                                v-on="on"
                                ></v-card>
                            </template> -->
                            <template v-slot:activator="{ on, attrs }">
                                <v-card
                                    class="portrait"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-card-title>
                                        {{item.title}}
                                    </v-card-title>
                                    <v-card-text>
                                        {{item.content}}
                                    </v-card-text>
                                </v-card>
                            </template>
                            <v-list>
                                <v-list-item
                                    :key="To_Project"
                                >
                                    <v-dialog
                                    v-model="dialog_project"
                                    persistent
                                    max-width="600px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        text
                                        v-bind="attrs"
                                        v-on="on"
                                        block
                                        @click="loadProjectData(item)"
                                        >
                                        To Project
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                        <span class="text-h5">Add new project</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form
                                                ref="form"
                                                lazy-validation
                                            >
                                                <v-container>
                                                    <v-row>
                                                        <v-col
                                                            cols="12"
                                                        >
                                                            <v-text-field
                                                                v-model="project_data['title']"
                                                                label="Title*"
                                                                :rules="titleRules"
                                                                dense
                                                                required
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                        >
                                                            <v-textarea
                                                                v-model="project_data['intro']"
                                                                label="Intro"
                                                                dense
                                                            ></v-textarea>
                                                        </v-col>       
                                                        
                                                        <v-col
                                                            cols="12"
                                                        >
                                                            <v-text-field
                                                                v-model="project_data['tag']"
                                                                label="Tag"
                                                                dense
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                        >
                                                            <v-slider
                                                                label="Importance"
                                                                :tick-labels="importance"
                                                                v-model="project_data['importance']"
                                                                min="0"
                                                                max="2"
                                                                ticks="always"
                                                                tick-size="4"
                                                                dense
                                                            >
                                                            </v-slider>
                                                        </v-col>                                     
                                                        <v-col
                                                            cols="9"
                                                        >
                                                            <v-text-field
                                                                label="Deadline Date*"
                                                                prepend-inner-icon="mdi-calendar"
                                                                v-model="project_data['deadlineDate']"
                                                                dense
                                                                required
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="3"
                                                        >
                                                            <v-menu
                                                            offset-y
                                                            :close-on-content-click="false"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn
                                                                    color="primary"
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    >
                                                                    Select Date
                                                                    </v-btn>
                                                                </template>

                                                                <v-card>
                                                                    <v-date-picker
                                                                        v-model="project_data['deadlineDate']"
                                                                        elevation="15"
                                                                        :picker-date.sync="pickerDate"
                                                                    ></v-date-picker>
                                                                </v-card>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col
                                                            cols="9"
                                                        >
                                                            <v-text-field
                                                                label="Deadline Time*"
                                                                prepend-inner-icon="mdi-clock-time-five-outline"
                                                                v-model="project_data['deadlineTime']"
                                                                dense
                                                                required
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="3"
                                                        >
                                                            <v-menu
                                                            offset-y
                                                            :close-on-content-click="false"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn
                                                                    color="primary"
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    >
                                                                    Select Time
                                                                    </v-btn>
                                                                </template>

                                                                <v-card>
                                                                    <v-time-picker
                                                                        v-model="project_data['deadlineTime']"
                                                                        elevation="15"
                                                                        format="24hr"
                                                                        scrollable
                                                                    ></v-time-picker>
                                                                </v-card>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col
                                                            v-for="(task, index) in project_data['taskList']"
                                                            :key="task.title"
                                                            cols="12"
                                                        >
                                                            <v-text-field
                                                                :label="'Task '+index"
                                                                v-model="task.value"
                                                                dense
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                        >
                                                            <v-btn
                                                                block
                                                                outlined
                                                                color="primary"
                                                                @click="addNewTask"
                                                            >
                                                                <v-icon
                                                                    left
                                                                >
                                                                    mdi-plus-circle
                                                                </v-icon>
                                                                Add new task
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        <small>*indicates required field</small>
                                        </v-card-text>
                                        <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog_project = false"
                                        >
                                            Close
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="consoleData(project_data)"
                                        >
                                            Save
                                        </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                    <!-- <v-btn text @click="console.log(item.title)">{{choice.title}}</v-btn> -->
                                    <!-- <v-list-item-title>{{choice.choice}}</v-list-item-title> -->
                                </v-list-item>
                                <v-list-item
                                    :key="To_Calendar"
                                >
                                    <v-dialog
                                    v-model="dialog_calendar"
                                    persistent
                                    max-width="600px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        text
                                        v-bind="attrs"
                                        v-on="on"
                                        block
                                        @click="loadEventData(item)"
                                        >
                                        To Calendar
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                        <span class="text-h5">Add new event</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form
                                                ref="form"
                                                lazy-validation
                                            >
                                                <v-container>
                                                    <v-row>
                                                        <v-col
                                                            cols="12"
                                                        >
                                                            <v-text-field
                                                                v-model="event_data['title']"
                                                                label="Title*"
                                                                :rules="titleRules"
                                                                dense
                                                                required
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                        >
                                                            <v-textarea
                                                                v-model="event_data['content']"
                                                                label="Content"
                                                                dense
                                                            ></v-textarea>
                                                        </v-col>                                            
                                                        <v-col
                                                            cols="9"
                                                        >
                                                            <v-text-field
                                                                label="Start Date*"
                                                                prepend-inner-icon="mdi-calendar"
                                                                v-model="event_data['startDate']"
                                                                dense
                                                                required
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="3"
                                                        >
                                                            <v-menu
                                                            offset-y
                                                            :close-on-content-click="false"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn
                                                                    color="primary"
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    >
                                                                    Select Date
                                                                    </v-btn>
                                                                </template>

                                                                <v-card>
                                                                    <v-date-picker
                                                                        v-model="event_data['startDate']"
                                                                        elevation="15"
                                                                        :picker-date.sync="pickerDate"
                                                                    ></v-date-picker>
                                                                </v-card>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col
                                                            cols="9"
                                                        >
                                                            <v-text-field
                                                                label="Start Time*"
                                                                prepend-inner-icon="mdi-clock-time-five-outline"
                                                                v-model="event_data['startTime']"
                                                                dense
                                                                required
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="3"
                                                        >
                                                            <v-menu
                                                            offset-y
                                                            :close-on-content-click="false"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn
                                                                    color="primary"
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    >
                                                                    Select Time
                                                                    </v-btn>
                                                                </template>

                                                                <v-card>
                                                                    <v-time-picker
                                                                        v-model="event_data['startTime']"
                                                                        elevation="15"
                                                                        format="24hr"
                                                                        scrollable
                                                                    ></v-time-picker>
                                                                </v-card>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col
                                                            cols="9"
                                                        >
                                                            <v-text-field
                                                                label="End Date*"
                                                                prepend-inner-icon="mdi-calendar"
                                                                v-model="event_data['endDate']"
                                                                dense
                                                                required
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="3"
                                                        >
                                                            <v-menu
                                                            offset-y
                                                            :close-on-content-click="false"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn
                                                                    color="primary"
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    >
                                                                    Select Date
                                                                    </v-btn>
                                                                </template>

                                                                <v-card>
                                                                    <v-date-picker
                                                                        v-model="event_data['endDate']"
                                                                        elevation="15"
                                                                        :picker-date.sync="pickerDate"
                                                                    ></v-date-picker>
                                                                </v-card>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col
                                                            cols="9"
                                                        >
                                                            <v-text-field
                                                                label="End Time*"
                                                                prepend-inner-icon="mdi-clock-time-five-outline"
                                                                v-model="event_data['endTime']"
                                                                dense
                                                                required
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="3"
                                                        >
                                                            <v-menu
                                                            offset-y
                                                            :close-on-content-click="false"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn
                                                                    color="primary"
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    >
                                                                    Select Time
                                                                    </v-btn>
                                                                </template>

                                                                <v-card>
                                                                    <v-time-picker
                                                                        v-model="event_data['endTime']"
                                                                        elevation="15"
                                                                        format="24hr"
                                                                        :close-on-content-click="false"
                                                                        scrollable
                                                                    ></v-time-picker>
                                                                </v-card>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-form>
                                        <small>*indicates required field</small>
                                        </v-card-text>
                                        <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog_calendar = false"
                                        >
                                            Close
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="AddEvent(event_data)"
                                        >
                                            Save
                                        </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                    <!-- <v-btn text @click="console.log(item.title)">{{choice.title}}</v-btn> -->
                                    <!-- <v-list-item-title>{{choice.choice}}</v-list-item-title> -->
                                </v-list-item>
                                <v-list-item
                                    :key="deleteStuff"
                                >
                                    <v-dialog
                                        v-model="dialog_delete"
                                        persistent
                                        max-width="600px"
                                    >
                                    
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            text
                                            v-bind="attrs"
                                            v-on="on"
                                            color="error"
                                            block
                                            @click="loadDeleteId"
                                            >
                                            Delete
                                            </v-btn>
                                        </template>

                                        <v-card>
                                            <v-card-title class="text-h5">
                                            Warning
                                            </v-card-title>
                                            <v-card-text>Are you sure you want to delete this memo?</v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="dialog_delete = false"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    color="error"
                                                    text
                                                    @click="RemoveStuff(delete_data)"
                                                >
                                                    Delete
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>

                                    </v-dialog>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions} from "vuex";

export default {
    data () {
        return{
            dialog_project: false,
            dialog_calendar: false,
            dialog_delete: false,
            importance: [
                'Low',
                'Medium',
                'High'
            ],
            titleRules: [
                v => !!v || 'Title is required'
            ],
            project_data: {
                id: "",
                title: "",
                intro: "",
                tag: "",
                importance: "",
                deadlineDate: new Date().toISOString().substr(0, 10),
                deadlineTime: new Date().toISOString().substr(11, 5),
                taskList: [],
                highlighted: "",
            },
            event_data: {
                id: "",
                title: "",
                content: "",
                startDate: new Date().toISOString().substr(0, 10),
                startTime: new Date().toISOString().substr(11, 5),
                endDate: new Date().toISOString().substr(0, 10),
                endTime: new Date().toISOString().substr(11, 5),
            },
            delete_data: {
                delete_id: "",
            },

            memo_data: {
                    title: "",
                    content: ""
            },

            memo_items: [
                {
                    id: "1",
                    title: "title1",
                    content: "content"
                },
                {
                    id: "2",
                    title: "title2",
                    content: "contentasdfjasoidfoasjfdiasodjfijasodifijadsjoaifoaidsjfoiasjdiofjoias"
                },
                {
                    id: "3",
                    title: "title3",
                    content: "content"
                },
                {
                    id: "4",
                    title: "title4",
                    content: "content"
                },
            ]
        }
    },
    methods: {
        ...mapActions([
                "AddEvent",
                "AddStuff",
                "RemoveStuff"
            ]),

        loadProjectData (item) {
            this.project_data.id = item.id;
            this.project_data.title = item.title;
            this.project_data.intro = item.content;
            this.project_data.tag = "";
            this.project_data.importance = "1";
            this.project_data.deadlineDate = new Date(+(new Date() - new Date().getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.project_data.deadlineTime = new Date(+(new Date() - new Date().getTimezoneOffset() * 60000)).toISOString().substr(11, 5);
            this.project_data.taskList = [],
            this.highlighted = "0"
        },
        addNewTask: function () {
            // var index = this.taskList.length.toString();
            this.project_data.taskList.push({value: ''});
        },
        consoleData: function (data) {
            console.log(data);
        },
        loadEventData (item) {
            this.event_data.id = item.id;
            this.event_data.title = item.title;
            this.event_data.content = item.content;
            this.event_data.startDate = new Date(+(new Date() - new Date().getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.event_data.startTime = new Date(+(new Date() - new Date().getTimezoneOffset() * 60000)).toISOString().substr(11, 5);
            this.event_data.endDate = new Date(+(new Date() - new Date().getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.event_data.endTime = new Date(+(new Date() - new Date().getTimezoneOffset() * 60000)).toISOString().substr(11, 5);
            console.log(new Date().getTimezoneOffset())
        },
        loadDeleteId (item) {
            this.delete_id = item.id;
        },
        
        validate () {
            this.$refs.form.validate()
        },
    }
}
</script>

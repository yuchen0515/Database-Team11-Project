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
                    <v-btn color="success">text</v-btn>
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
                                        >
                                        To Project
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                        <div>{{item.title}}</div>
                                        <span class="text-h5">Not finish</span>
                                        </v-card-title>
                                        <v-card-text>
                                        <v-container>
                                            <v-row>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                label="Legal first name*"
                                                required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                label="Legal middle name"
                                                hint="example of helper text only on focus"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                label="Legal last name*"
                                                hint="example of persistent helper text"
                                                persistent-hint
                                                required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field
                                                label="Email*"
                                                required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field
                                                label="Password*"
                                                type="password"
                                                required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                            >
                                                <v-select
                                                :items="['0-17', '18-29', '30-54', '54+']"
                                                label="Age*"
                                                required
                                                ></v-select>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                            >
                                                <v-autocomplete
                                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                                label="Interests"
                                                multiple
                                                ></v-autocomplete>
                                            </v-col>
                                            </v-row>
                                        </v-container>
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
                                            @click="dialog_project = false"
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
                                            @click="dialog_calendar = false"
                                        >
                                            Save
                                        </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                    <!-- <v-btn text @click="console.log(item.title)">{{choice.title}}</v-btn> -->
                                    <!-- <v-list-item-title>{{choice.choice}}</v-list-item-title> -->
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
export default {
    data () {
        return{
            dialog_project: false,
            dialog_calendar: false,
            titleRules: [
                v => !!v || 'Title is required'
            ],
            // memo_choice: [
            //     {
            //         title: "To Project"
            //     },
            //     {
            //         title: "To Calendar"
            //     }
            // ],
            event_data: {
                title: "",
                content: "",
                startDate: new Date().toISOString().substr(0, 10),
                startTime: new Date().toISOString().substr(11, 5),
                endDate: new Date().toISOString().substr(0, 10),
                endTime: new Date().toISOString().substr(11, 5),
            },
            memo_items: [
                {
                    title: "title1",
                    content: "content"
                },
                {
                    title: "title2",
                    content: "content"
                },
                {
                    title: "title3",
                    content: "content"
                },
            ]
        }
    },
    methods: {
        loadEventData (item) {
            this.event_data.title = item.title;
            this.event_data.content = item.content;
            this.event_data.startDate = new Date().toISOString().substr(0, 10);
            this.event_data.endTime = new Date().toISOString().substr(11, 5);
            this.event_data.endDate = new Date().toISOString().substr(0, 10);
            this.event_data.endTime = new Date().toISOString().substr(11, 5);
        },
        
        validate () {
            this.$refs.form.validate()
        },
    }
}
</script>
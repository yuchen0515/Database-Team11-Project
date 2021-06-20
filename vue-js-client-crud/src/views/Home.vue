<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="5"
      >
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
            >
              <!-- newmomo -->
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
                      >
                          <v-icon>mdi-plus</v-icon>
                      </v-btn>
                  </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <!-- calendar -->
              <v-sheet height="32">
                <v-toolbar
                  flat
                >
                  <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                  >
                    Today
                  </v-btn>
                  <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="prev"
                  >
                    <v-icon small>
                      mdi-chevron-left
                    </v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="next"
                  >
                    <v-icon small>
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>
                  <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </v-sheet>
              <v-sheet height="350">
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  type="day"
                  :events="events"
                  :event-color="getEventColor"
                  @change="fetchEvents"
                ></v-calendar>
              </v-sheet>
              <!-- <v-sheet
                height="400"
              >
                <v-calendar
                  color="primary"
                  type="day"
                >
                  <template v-slot:day-header="{ present }">
                    <template
                      v-if="present"
                      class="text-center"
                    >
                      Today
                    </template>
                  </template>

                  <template v-slot:interval="{ hour }">
                    <div
                      class="text-center"
                    >
                      {{ hour }} o'clock
                    </div>
                  </template>
                </v-calendar>
              </v-sheet> -->
            </v-col>
          </v-row>
        </v-container>
      </v-col> 
      <v-col
        cols="7"
      >
        <!-- Project -->
        <v-container>
          <v-row>
            <v-col
                v-for="item in project_items"
                :key="item.title"
                cols="12"
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
                        height="90"
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
                            <!-- <v-row>
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
                            </v-row> -->
                        </v-container>
                    </v-card>
                </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      
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
                    importance: "1",
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
                    importance: "0",
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
            ],
      focus: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    // beforeCreate: function () {
    //   if (!this.$store.state.username) {
    //     this.$router.push('/Login')
    //   }
    // },

    methods: {
      
      getEventColor () {
        return "primary"
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      fetchEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      
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
    },
  }
</script>

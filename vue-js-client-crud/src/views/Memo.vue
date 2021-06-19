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
                                    v-for="(choice, index) in memo_choice"
                                    :key="index"
                                >
                                    <v-btn text>{{choice.choice}}</v-btn>
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
            memo_choice: [
                {
                    choice: "To Project"
                },
                {
                    choice: "To Calendar"
                }
            ],
            memo_items: [
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
                {
                    title: "title",
                    content: "content"
                },
            ]
        }
    }
}
</script>
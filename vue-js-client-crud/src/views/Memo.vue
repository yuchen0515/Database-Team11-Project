<template>
    <v-row
        no-gutters
        height="100%"
    >
        <v-col
            cols = "5"
        >
            <v-card
                height="100%"
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

                </v-row>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data () {
        return{

        }
    }
}
</script>
<template>
  <div
    style="width: 95%"
    class="mx-2 my-4"
  >
    <v-row class="mx-0">
      <v-col
        cols="5"
        class="pa-3"
      >
        <!-- <v-row class="mt-3 pa-2"> -->

        <p>Type your query in the space / select one from the dropdown below</p>
        <textarea
          class="query-space"
          id="query-space"
        ></textarea>

        <!-- </v-row> -->
        <v-row class="my-3">
          <v-col
            cols="9"
            class="py-0"
          >
            <v-autocomplete
              v-model="query"
              @change="changeQuery()"
              :items="queries"
              item-text="name"
              item-value="name"
              return-object
              outlined
              dense
              hide-details
              label="Queries"
            ></v-autocomplete>
          </v-col>
          <v-col
            cols="3"
            class="py-0"
          >
            <v-btn
              @click="runQuery()"
              :loading="isRunSql"
              :disabled="isSubmit"
              class="mb-5"
            >Run SQL</v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <h2
          style="color: '#797979'"
          class="my-3"
        >Query Builder</h2>
        <v-divider></v-divider>
        <h4 class="my-2">Using natural language</h4>

        <v-row>
          <v-col cols="9">
            <v-combobox
              @change="changeText()"
              @input="handleInput"
              :items="naturalSentences"
              item-text="text"
              item-value="text"
              return-object
              outlined
              dense
              hide-details
              placeholder="Type your natural language here..."
            ></v-combobox>
          </v-col>
          <v-col cols="auto">
            <v-btn
              @click="submitText()"
              :loading="isSubmit"
              :disabled="isRunSql"
            >
              Submit
            </v-btn>
          </v-col>

        </v-row>

        <h4 class="mt-4">Manual</h4>

        <v-row>
          <v-col cols="12">
            <v-select
              @change="selectField()"
              v-model="field"
              :items="columns"
              label="Show"
              hide-details
              multiple
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-select
              @change="selectOrderField()"
              v-model="orderField"
              :items="columns"
              label="Field"
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              @change="selectOrder()"
              v-model="orderName"
              :items="order"
              label="Order"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              @change="selectLimit()"
              v-model="limitField"
              :items="limit"
              label="Limit"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6">

            <v-btn
              @click="generateQuery()"
              :disabled="field === '' && orderField === '' && orderName === ''"
            >GENERATE QUERY</v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col
            cols="6"
            class="text-right"
          >
            <v-btn
              :disabled="field === '' && orderField === '' && orderName === ''"
              @click="reset()"
            >RESET</v-btn>

          </v-col>
        </v-row>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col
        cols="7"
        class="pa-3"
      >

        <v-skeleton-loader
          v-if="isRunSql"
          type="table-heading, table-thead, table-tbody, table-tfoot"
        ></v-skeleton-loader>

        <div v-else>
          <h1>OrderDetails</h1>
          <v-text-field
            v-model="search"
            class="mb-3"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-data-table
            :headers="headers"
            :items="tableItems"
            :items-per-page="10"
            :search="search"
            class="elevation-1"
          ></v-data-table>

        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import orderdetails from "../orderdetails.json";
export default {
  name: "Dashboard",
  props: ["isDark"],
  data: () => ({
    editor: null,
    finalQuery: "",
    search: "",
    field: "",
    columns: ["orderID", "productID", "unitPrice", "quantity", "discount"],
    orderField: "",
    order: ["ASC", "DSC"],
    orderName: "",
    query: "",
    limit: ["5", "10", "15", "50"],
    limitField: "5",

    isRunSql: false,
    isSubmit: false,
    value: "SELECT * FROM orderdetails LIMIT 5",
    headers: [
      {
        text: "orderID",
        value: "orderID",
      },
      { text: "productID", value: "productID" },
      { text: "unitPrice", value: "unitPrice" },
      { text: "quantity", value: "quantity" },
      { text: "discount", value: "discount" },
    ],
    items: orderdetails,
    tableItems: [],
    queries: [
      {
        name: "SELECT * FROM orderdetails LIMIT 100",
        limit: 100,
      },
      {
        name: "SELECT orderID, productID, unitPrice, quantity, discount FROM orderdetails LIMIT 500",
        limit: 500,
      },
      {
        name: "SELECT orderID, productID, unitPrice, quantity, discount FROM orderdetails WHERE orderID = '123' LIMIT 600",
        limit: 600,
      },
      {
        name: "SELECT unitPrice, quantity, discount FROM orderdetails LIMIT 870",
        limit: 870,
      },
      {
        name: "SELECT unitPrice, discount FROM orderdetails ORDER BY unitPrice ASC LIMIT 2000",
        limit: 2000,
      },
      {
        name: "SELECT quantity, discount FROM orderdetails LIMIT 450",
        limit: 450,
      },
      {
        name: "SELECT unitPrice, quantity FROM orderdetails LIMIT 790",
        limit: 790,
      },
      {
        name: "SELECT discount FROM orderdetails LIMIT 320",
        limit: 320,
      },
      {
        name: "SELECT productID FROM orderdetails LIMIT 34 LIMIT 1900",
        limit: 1900,
      },
      {
        name: "SELECT discount FROM orderdetails ORDER BY unitPrice ASC LIMIT 50",
        limit: 50,
      },
    ],
    naturalText: "",
    hint: "",
    naturalSentences: [
      {
        text: "query to list products with quantity more than 40 and dicount greater than 0",
        limit: 100,
      },
      {
        text: "query to find products with unit price between 10 and 50",
        limit: 276,
      },
      {
        text: "query to search products with product id 65 and dicount 0.15",
        limit: 579,
      },
      {
        text: "query to look for products with quantity > 50",
        limit: 94,
      },
      {
        text: "query to list out products with quantity between 10 and 50 and unit price < 100",
        limit: 838,
      },
    ],
  }),
  watch: {
    isDark: function () {
      if (this.isDark) {
        this.editor.setOption("theme", "monokai");
      } else {
        this.editor.setOption("theme", "");
      }
    },
  },
  created() {},
  mounted() {
    this.tableItems = this.items;

    this.editor = CodeMirror.fromTextArea(
      document.getElementById("query-space"),
      {
        lineNumbers: true,
        tabSize: 2,
        lineWrapping: true,
        value: this.inputValue,
        styleActiveLine: true,
        styleActiveSelected: true,
        styleSelectedText: true,
        mode: "text/x-sql",
        gutters: ["CodeMirror-lint-markers"],
        lint: true,
      }
    );

    this.editor.getDoc().setValue(this.value);
    this.editor.setSize(null, 100);
  },
  methods: {
    runQuery() {
      this.isRunSql = true;
      let limit;
      setTimeout(() => {
        if (this.query.limit) {
          limit = this.query.limit;
        } else if (this.limitField !== "") {
          limit = this.limitField;
        } else {
          limit = Math.floor(Math.random() * (this.items.length - 1 + 1)) + 1;
        }

        const end = this.query.limit ? this.query.limit : limit;
        this.tableItems = this.items.slice(0, end);
        this.isRunSql = false;
      }, 700);
    },
    changeQuery() {
      this.editor.getDoc().setValue(this.query.name);
    },
    selectField() {
      console.log(this.field);
    },
    selectOrderField() {
      console.log(this.orderField);
    },
    selectOrder() {
      console.log(this.orderName);
    },
    selectLimit() {
      console.log(this.limitField);
    },
    generateQuery() {
      //todo: generate query
      const fields = this.field.toString();
      let query;
      if (fields !== "") {
        query = `SELECT ${fields} FROM orderdetails LIMIT ${this.limitField}`;
      } else {
        query = `SELECT * FROM orderdetails LIMIT ${this.limitField}`;
      }

      if (this.orderField !== "" && this.orderName !== "") {
        query = `${query} ORDER BY ${this.orderField} ${this.orderName}`;
      }

      this.editor.getDoc().setValue(query);
    },
    changeText() {},
    async submitText() {
      setTimeout(async () => {
        if (this.naturalText !== "") {
          this.isSubmit = true;
          const body = {
            prompt: `### SQL table, with its properties:
            # orderdetails(orderId, productId, unitPrice, quantity, discount)
            ### ${this.naturalText}
            SELECT`,
            temperature: 0,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["#", ";"],
          };
          try {
            const rawResponse = await fetch(
              "https://api.openai.com/v1/engines/code-davinci-002/completions",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${process.env.VUE_APP_SECRET_KEY}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
              }
            );
            const content = await rawResponse.json();
            this.editor.getDoc().setValue(`SELECT${content.choices[0].text}`);
            this.isSubmit = false;
          } catch (error) {
            console.error(error);
          }
        }
      }, 100);
    },
    handleInput(e) {
      if (typeof e == "string") {
        this.naturalText = e;
      } else {
        this.naturalText = e.text;
      }
    },
    reset() {
      this.field = "";
      this.orderField = "";
      this.orderName = "";
    },
  },
};
</script>

<style lang="scss">
.CodeMirror {
  border: 1px solid black;
}
</style>

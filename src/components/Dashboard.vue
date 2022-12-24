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

        <!-- <v-textarea
            v-model="inputQuery"
            name="SQL query"
            filled
            label="Type your SQL query here OR select one from below dropdown"
            auto-grow
            clearable
          ></v-textarea> -->

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
              :loading="isLoading"
              class="mb-5"
            >Run SQL</v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <h2 style="color: '#797979'">Query Builder</h2>
        <v-row>
          <v-col cols="12">
            <v-select
              @change="selectField()"
              v-model="field"
              :items="columns"
              label="Show"
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
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              @change="selectOrder()"
              v-model="orderName"
              :items="order"
              label="Order"
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
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn @click="generateQuery()">GENERATE QUERY</v-btn>
        </v-row>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col
        cols="7"
        class="pa-3"
      >
        <!-- <textarea id="sqlinput"></textarea> -->

        <v-skeleton-loader
          v-if="isLoading"
          type="table-heading, table-thead, table-tbody, table-tfoot"
        ></v-skeleton-loader>

        <v-data-table
          v-else
          :headers="headers"
          :items="tableItems"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
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
    field: "",
    columns: ["orderID", "productID", "unitPrice", "quantity", "discount"],
    orderField: "",
    order: ["ASC", "DSC"],
    orderName: "",
    limit: ["5", "10", "15", "50"],
    limitField: "5",

    inputQuery: "SELECT * FROM orderdetails LIMIT 5",
    query: "",
    isLoading: false,
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
    this.editor.setSize(null, 200);
  },
  methods: {
    runQuery() {
      this.isLoading = true;
      setTimeout(() => {
        const end = this.query.limit ? this.query.limit : 100;
        this.tableItems = this.items.slice(0, end);
        this.isLoading = false;
      }, 1000);
    },
    changeQuery() {
      // this.inputQuery = this.query.name;

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
      console.log(
        "SELECT " + fields + " FROM orderdetails LIMIT " + this.limitField
      );
      if (fields !== "") {
        this.inputQuery = `SELECT ${fields} FROM orderdetails LIMIT ${this.limitField}`;
      } else {
        this.inputQuery = `SELECT * FROM orderdetails LIMIT ${this.limitField}`;
      }

      if (this.orderField !== "" && this.orderName !== "") {
        this.inputQuery = `${this.inputQuery} ORDER BY ${this.orderField} ${this.orderName}`;
      }

      this.editor.getDoc().setValue(this.inputQuery);
    },
  },
};
</script>

<style lang="scss">
.CodeMirror {
  border: 1px solid black;
}
</style>

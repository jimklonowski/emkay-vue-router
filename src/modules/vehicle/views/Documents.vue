<template>
  <section>
    <v-container>
      <header class="font-weight-thin display-2">
        {{ title2 }}
      </header>
      <v-subheader class="pl-1"
        >List of documents for viewing/downloading</v-subheader
      >
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title :class="headerClass">
              <header class="text-uppercase">
                <span class="font-weight-black">
                  {{ title1 }}
                </span>
                <span class="font-weight-thin">
                  {{ title2 }}
                </span>
              </header>
              <v-subheader dark>
                {{ vehicle }}
              </v-subheader>
              <v-spacer />
              <v-text-field
                v-model="search"
                class="font-weight-regular"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                dark
              />
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="10"
                :search="search"
                :sort-by="['date']"
                :sort-desc="[true]"
                :loading="loading"
                dense
              >
                <template v-slot:item.download="{ item }">
                  <v-icon small @click="download(item)">
                    get_app
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'Documents',
  data: () => ({
    title1: 'Vehicle',
    title2: 'Documents',
    loading: false,
    search: '',
    vehicle: '',
    headerClass: '',
    headers: [
      {
        text: 'Document Type',
        align: 'left',
        sortable: true,
        value: 'type'
      },
      {
        text: 'Create Date',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        text: 'Download',
        align: 'left',
        sortable: false,
        value: 'download'
      }
    ],
    items: [
      {
        type: 'Registration',
        date: '2019-09-09',
        download: 'path/to/item.pdf'
      },
      {
        type: 'Renewal Requirement',
        date: '2019-02-17',
        download: 'path/to/item2.pdf'
      },
      {
        type: 'POA-VIN Specific',
        date: '2019-02-16',
        download: 'path/to/item3.pdf'
      }
    ]
  }),
  created() {
    this.vehicle = this.$route.params.vehicle
    this.headerClass = this.$config.COMPONENT_HEADER_CLASS
  },
  methods: {
    download(item) {
      console.log(item)
      alert(`Downloading item at ${item.download}`)
    }
  }
}
</script>

<style></style>

<template>
  <v-card full-width>
    <v-navigation-drawer width="100%" nav dark floating permanent>
      <v-list dense round style="list-style:none;">
        <v-list-item v-for="item in items" :key="item.text" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="item.to" tag="li">
                {{ item.text }}
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'AccountNavigation',
  data() {
    return {
      items: [
        {
          text: 'Change Contact Information',
          icon: 'contact_mail',
          to: { name: 'contact-information' }
        },
        {
          text: 'Change Password',
          icon: 'security',
          to: { name: 'change-password' }
        },
        { text: 'Update Labels', icon: 'label', to: { name: 'labels' } },
        {
          text: 'Change Default Language',
          icon: 'language',
          to: { name: 'language' }
        },
        {
          text: 'Manage Website Logins',
          icon: 'supervisor_account',
          to: { name: 'logins' }
        }
      ]
    }
  }
}
</script>

<style></style>

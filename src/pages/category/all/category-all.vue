<template>
  <q-page padding>
    <div class="content-header" style="padding-bottom: 16px">
      <span class="vertical-bottom content-header-title">Ajuste de categorias</span>
    </div>
    <div class="bg-white" style="max-width: 800px">
      <q-list class="bg-white" style="text-align: center">
        <q-list-header>Listagem de todas as categorias</q-list-header>
        <q-item-separator />
        <template v-for="(category, item) in categories">
            <q-item :separator="true" :key="item">
                <q-item-side color="light-blue" :icon="category.icon || 'category'" />
                <q-item-main :label="category.name + ''" />
                <q-item-tile>
                  <q-btn icon="edit" size="sm" color="secondary" @click="editCategory" rounded/>
                </q-item-tile>
            </q-item>
        </template>
      </q-list>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        size="lg"
        color="primary"
        icon="add"
        @click="addCategory"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      categories: [
      ]
    }
  },
  methods: {
    addCategory () {
      alert('Em construção')
    },
    editCategory () {
      alert('Em construção')
    }
  },
  mounted () {
    this.$restAPI.get({
        req: 'category',
        action: 'getall'
    }).then((data) => {
        this.categories = data.categories
    })
  }
}
</script>

<style>
</style>

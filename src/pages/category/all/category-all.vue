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
            <q-item :separator="true" :key="item" :class="category.id ? '': 'offline-item'">
                <q-item-side :color="category.id ? 'light-blue': 'text-blue-grey-5'" :icon="category.icon || 'category'" />
                <q-item-main :label="category.name + ''" />
                <q-item-tile>
                  <!--q-btn icon="edit" size="sm" color="secondary" @click="editCategory(category)" rounded/-->
                  <q-btn :style="'margin-left: 5px;'" icon="clear" size="sm" color="red-5" @click="deleteCategory(category)" rounded/>
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
      this.$q.dialog({
        title: 'Adicionar',
        message: 'Digite abaixo o nome da categoria',
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true
      }).then(_catgry => {
        this.$restAPI.post({
          req: 'category',
          action: 'addcategory',
          data: {
            icon: 'category',
            name: _catgry
          }
        }).then((resp) => {
          this.loadCategories()
          this.addOfflineData({
            icon: 'category',
            name: _catgry
          })
        }).catch(() => {

        })
      })
    },
    addOfflineData (_catgry) {
      this.$offlineStorage.update('offlineCategories', (arr) => {
          arr.unshift(_catgry)
          return arr
      }, [])
    },
    getOfflineCategories () {
        return this.$offlineStorage.get('offlineCategories', [])
    },
    editCategory (ctgry) {
      alert('Em construção ' + ctgry.name)
    },
    deleteCategory (ctgry) {
      this.$q.dialog({
        title: 'Confirmação',
        message: 'Deseja realmente remover a categoria ' + ctgry.name + '?',
        ok: 'confirmar',
        cancel: 'cancelar'
      }).then(() => {
        this.$restAPI.post({
          req: 'category',
          action: 'removecategory',
          data: {
            id: ctgry.id
          }
        }).then((resp) => {
          this.loadCategories()
        })
      })
    },
    loadCategories () {
      this.$restAPI.get({
        req: 'category',
        action: 'getall'
      }).then((data) => {
          let auxArray = []
          this.categories = data.categories

          this.getOfflineCategories().forEach((offCtgry, i) => {
            const test = data.categories.every((exp2, j) => {
                if (!(
                    offCtgry.name === exp2.name &&
                    offCtgry.icon === exp2.icon)
                ) {
                    return true
                }
                return false
            })
            if (test) {
                auxArray.push(offCtgry)
            }
          })
          this.$offlineStorage.set('offlineCategories', auxArray)
          this.categories = [...auxArray, ...data.categories]
      })
    }
  },
  mounted () {
    this.loadCategories()
  }
}
</script>

<style>
.offline-item{
  opacity: 0.6;
}
</style>

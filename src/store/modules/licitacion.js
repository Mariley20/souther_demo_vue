import {
  SET_LICITACION_DATA,
  SET_LICITACION_DETAILS,
  SET_PRODUCTS,
  SET_COMPANIES, ADD_COMPANY,
  UPDATE_PARTIAL_COMPANY_DATA,
  UPDATE_PARTIAL_PRODUCT_DATA,
  UPDATE_PARTIAL_LICITACION_DETAIL_DATA,
  ADD_LICITACION_DETAIL
} from '@/store/mutationTypes.js'

const state = () => ({
  licitacion: null,
  licitacionDetails: [],
  products: [],
  companies: []
})

const getters = {
  licitacionDetailIdsBestDeliveryDays: (state) => {
    const detailIds = []
    state.products.forEach(product => {
      const detailProduct = state.licitacionDetails
        .filter(detail => detail.producto_id === product.id && detail.dias_de_entrega > 0 && detail.price_landed > 0)
      if (detailProduct.length === 1) {
        detailIds.push(detailProduct[0])
      }
      if (detailProduct.length > 1) {
        const detailProductSorted = detailProduct.sort((a, b) => a.dias_de_entrega - b.dias_de_entrega)
        detailIds.push(detailProductSorted[0])
      }
    })
    return detailIds.map(item => item.id)
  }
}
const actions = {
  setLicitacionData ({ commit }, { data }) {
    commit(SET_LICITACION_DATA, { data })
  },
  setLicitacionDetails ({ commit }, { licitacionDetails }) {
    commit(SET_LICITACION_DETAILS, { licitacionDetails })
  },
  addLicitacionDetail ({ commit }, { licitacionDetail }) {
    commit(ADD_LICITACION_DETAIL, { licitacionDetail })
  },
  setProducts ({ commit }, { products }) {
    commit(SET_PRODUCTS, { products })
  },
  setCompanies ({ commit }, { data }) {
    commit(SET_COMPANIES, { data })
  },
  addCompany ({ commit }, { data }) {
    commit(ADD_COMPANY, { data })
  },
  updatePartialCompanyData ({ commit }, { companyId, data }) {
    commit(UPDATE_PARTIAL_COMPANY_DATA, { companyId, data })
  },
  updatePartialProductData ({ commit }, { productId, data }) {
    commit(UPDATE_PARTIAL_PRODUCT_DATA, { productId, data })
  },
  updatePartialLicitacionDetailData ({ commit, state }, { licitacionDetailId, data }) {
    commit(UPDATE_PARTIAL_LICITACION_DETAIL_DATA, { licitacionDetailId, data })
  }
}

const mutations = {
  [SET_LICITACION_DATA] (state, { data }) {
    state.licitacion = data
  },
  [SET_LICITACION_DETAILS] (state, { licitacionDetails }) {
    state.licitacionDetails = licitacionDetails
  },
  [ADD_LICITACION_DETAIL] (state, { licitacionDetail }) {
    state.licitacionDetails.push(licitacionDetail)
  },
  [SET_PRODUCTS] (state, { products }) {
    state.products = products
  },
  [SET_COMPANIES] (state, { data }) {
    state.companies = data
  },
  [ADD_COMPANY] (state, { data }) {
    state.companies.push(data)
  },
  [UPDATE_PARTIAL_COMPANY_DATA] (state, { companyId, data }) {
    const companyIndex = state.companies.findIndex(company => company.id === companyId)
    console.log(companyId, data, companyIndex)
    for (const [key, value] of Object.entries(data)) {
      state.companies[companyIndex][key] = value
    }
  },
  [UPDATE_PARTIAL_PRODUCT_DATA] (state, { productId, data }) {
    console.log(productId, data)
    const productIndex = state.products.findIndex(product => product.id === productId)
    for (const [key, value] of Object.entries(data)) {
      state.products[productIndex][key] = value
    }
  },
  [UPDATE_PARTIAL_LICITACION_DETAIL_DATA] (state, { licitacionDetailId, data }) {
    const licitacionDetailIndex = state.licitacionDetails.findIndex(licitacionDetail => licitacionDetail.id === licitacionDetailId)
    for (const [key, value] of Object.entries(data)) {
      state.licitacionDetails[licitacionDetailIndex][key] = value
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

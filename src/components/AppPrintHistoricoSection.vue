<template>
  <section
    v-if="betterLicitacionDetails.length > 0"
    class="mt-16 pt-16"
  >
    <h2 style="text-align: center; font-family: system-ui;">
      HISTÓRICO DE PRECIOS (MRP)
    </h2>
    <table
      border="1"
      style="margin: 16px auto; border-collapse: collapse; border-color: #909090; font-size: 12px;font-family: system-ui; text-align: center;"
    >
      <tbody>
        <tr style="text-align: left;">
          <td
            style="max-width: 250px; width: 250px;padding: 4px;"
            colspan="4"
          >
            <b>Número de la licitación :</b>
          </td>
          <td
            :colspan="11"
            style="padding: 4px;"
          >
            {{ licitacion.numero_de_la_licitacion }}
          </td>
        </tr>
        <tr style="text-align: left;">
          <td
            style="padding: 4px;"
            colspan="4"
          >
            <b>Nombre de la licitación :</b>
          </td>
          <td
            :colspan="11"
            style="padding: 4px;"
          >
            {{ licitacion.nombre_de_la_licitacion }}
          </td>
        </tr>
        <tr style="text-align: left;">
          <td
            style="padding: 4px;"
            colspan="4"
          >
            <b>Responsable de la licitación :</b>
          </td>
          <td
            :colspan="11"
            style="padding: 4px;"
          >
            {{ licitacion.responsable_de_la_licitacion }}
          </td>
        </tr>
        <tr
          class="sheet-row"
          style="background-color: #0095A9; color: white;"
        >
          <th>#</th>
          <th>Material</th>
          <th>Texto breve</th>
          <th>Fabricante 1</th>
          <th>N_parte1</th>
          <th>Cantidad solicitado</th>
          <th>Unidad de medida</th>
          <th>Ultimo prov SAP</th>
          <th>Ultimo precio SAP</th>
          <th>Ultimo moneda SAP</th>
          <th>Fecha ultimo pedido</th>
          <th>Precio Actual</th>
          <th class="px-1">
            Variación (%)
          </th>
          <th class="px-1">
            Variación (MONEDA)
          </th>
          <th>Proveedor Actual</th>
        </tr>
        <tr
          v-for="(item,index) in historico"
          :key="item.id"
          class="sheet-row"
        >
          <td>#{{ index + 1 }}</td>
          <td>
            {{ item.material }}
          </td>
          <td>
            <div>{{ item.productName }}</div>
          </td>
          <td>{{ item.fabricante }}</td>
          <td>{{ item.nParte1 }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ item.unidadDeMedida }}</td>
          <td>{{ item.ultimoProvSap }}</td>
          <td>{{ getNumberFormatted(item.ultimoPrecioSap) }}</td>
          <td>{{ item.ultimoMonedaSap }}</td>
          <td>{{ getNumberDateFormatted(item.fechaUltimoPedido) }}</td>
          <td>{{ getNumberFormatted(item.priceCurrent) }}</td>
          <td
            :style="{
              'color': item.variacionPercentage > 0 ? 'red':''
            }"
          >
            {{ getPercentageNumberFormatted(item.variacionPercentage) }}
          </td>
          <td>{{ getNumberFormatted(item.variacionMoneda ) }}</td>
          <td>{{ item.companyNameCurrent }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import getNumberFormatted from '@/helpers/getNumberFormatted'
import getPercentageNumberFormatted from '@/helpers/getPercentageNumberFormatted'
import getNumberDateFormatted from '@/helpers/getNumberDateFormatted'
export default {
  computed: {
    ...mapState({
      historico: (state) => state.licitacion.historico,
      licitacion: (state) => state.licitacion.licitacion,
      licitacionDetails: (state) => state.licitacion.licitacionDetails,
      products: (state) => state.licitacion.products
    }),
    betterLicitacionDetails () {
      const licitacionDetails = this.licitacionDetails.filter(detail => detail.better_price_landed === true)
      return licitacionDetails.map(item => {
        const product = this.products.find(product => product.id === item.producto_id)
        const variacion = product.last_price > 0 ? (item.price - product.last_price) / product.last_price : 0

        return {
          id: item.id,
          productName: product.name,
          productId: product.id,
          code: product.code,
          lastPrice: product.last_price,
          companyName: item.company_name,
          price: item.price,
          priceLanded: item.price_landed,
          variacion: `${(Math.round(variacion * 100) / 100) * 100}%`
        }
      })
    }
  },
  methods: {
    getNumberFormatted,
    getPercentageNumberFormatted,
    getNumberDateFormatted
  }
}
</script>

<style lang="scss" scoped>
.sheet-table, table {
  border: 1px solid rgb(128, 128, 128);
  border-collapse: collapse;
}
.sheet-row td, th {
  border: 1px solid rgb(228, 228, 228);
  padding: 1px 2px;
}
</style>

<template>
  <section
    style="font-size: 12px;font-family: system-ui;"
    class="overflow-auto"
  >
    <!-- <h2 style="text-align: center;font-family: system-ui; ">
      CUADRO COMPARATIVO
    </h2> -->
    <table style="background-color: #d72630; width: 101%; margin: -8px -8px 8px -8px;">
      <tbody>
        <tr>
          <td style="width: 40px;max-width: 40px;">
            <img
              src="@/assets/southern-logo.jpeg"
              alt=""
              height="35"
              class="mr-4"
            >
          </td>
          <td>
            <h3 style="text-align: left;font-family: system-ui; margin: 0; color: white; ">
              CUADRO COMPARATIVO
            </h3>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="licitacion"
      border="1"
      style="margin: 10px auto; border-collapse: collapse; border-color: #909090; font-size: 12px;font-family: system-ui;"
    >
      <tbody>
        <tr>
          <td
            style="max-width: 250px; width: 250px;padding-left: 4px;"
          >
            <b>Número de la licitación :</b>
          </td>
          <td
            :colspan="companies.length"
            style="padding-left: 4px;"
          >
            {{ licitacion.numero_de_la_licitacion }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Nombre de la licitación :</b>
          </td>
          <td
            :colspan="companies.length"
            style="padding-left: 4px;"
          >
            {{ licitacion.nombre_de_la_licitacion }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Responsable de la licitación :</b>
          </td>
          <td
            :colspan="companies.length"
            style="padding-left: 4px;"
          >
            {{ licitacion.responsable_de_la_licitacion }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Versión licitación :</b>
          </td>
          <td
            :colspan="companies.length"
            style="padding-left: 4px;"
          >
            {{ licitacion.version_licitación }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Moneda :</b>
          </td>
          <td
            :colspan="companies.length"
            style="padding-left: 4px;"
          >
            {{ licitacion.moneda }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Plazo para presentación de la oferta :</b>
          </td>
          <td
            :colspan="companies.length"
            style="padding-left: 4px;"
          >
            {{ licitacion.plazo_para_presentacion_de_la_oferta }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Fecha de descarga :</b>
          </td>
          <td
            :colspan="companies.length"
            style="padding-left: 4px;"
          >
            {{ licitacion.fecha_de_descarga }}
          </td>
        </tr>
        <!-- <tr></tr> -->
        <tr>
          <td style="padding-left: 4px;">
            <b>Proveedor</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            :style="{
              'padding-left': '4px',
              'background-color': getCompanyLicitacionSelected(company)
            }"
          >
            {{ company.name }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Moneda de la oferta</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
          >
            {{ company.moneda_de_la_oferta }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Cond de pago</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
          >
            {{ company.cond_de_pago }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Vig de Cotizacion</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
          >
            {{ company.vig_de_cotizacion }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Descripcion</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
          >
            {{ company.descripcion }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Numero de Oferta</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
          >
            {{ company.numero_de_oferta }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Valor total final</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
            :style="{
              'background-color': getValorTotalFinal(company) > 0? '#ffeb3b': ''
            }"
          >
            {{ getValorTotalFinal(company) }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Tipo de Cambio</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
          >
            {{ company.tipo_de_cambio }}
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>INCOTERM</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
          >
            {{ company.incoterm }}
          </td>
        </tr>
        <tr>
          <td
            class="font-weight-bold"
            style="vertical-align: middle; padding-left: 4px;"
          >
            <b>Factor Landed</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
          >
            {{ getCompanyFactorLandedFormat(company) }}%
          </td>
        </tr>
        <tr>
          <td style="padding-left: 4px;">
            <b>Valor Total de la Oferta</b>
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="padding-left: 4px;"
          >
            {{ getTotalOferta(company) }}
          </td>
        </tr>
        <tr>
          <td>
            <AppPrintLicitacionDetailSection
              :company="companies[0]"
              :company-index="0"
            />
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            style="vertical-align: baseline;"
          >
            <AppPrintLicitacionDetailSection
              :company="company"
              :company-index="companyIndex +1"
            />
          </td>
        </tr>
        <tr>
          <td
            class="font-weight-bold"
            style="vertical-align: middle; padding-left: 4px;"
          >
            Comentario
          </td>
          <td
            v-for="(company, companyIndex) in companies"
            :key="companyIndex"
            class="pa-1"
          >
            {{ company.comment }}
          </td>
        </tr>
        <!-- <tr></tr> -->
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import getNumberFormatted from '@/helpers/getNumberFormatted'

export default {
  components: {
    AppPrintLicitacionDetailSection: () => import('@/components/AppPrintLicitacionDetailSection.vue')
  },
  computed: {
    ...mapState({
      licitacionDetails: (state) => state.licitacion.licitacionDetails,
      products: (state) => state.licitacion.products,
      companies: (state) => state.licitacion.companies,
      licitacion: (state) => state.licitacion.licitacion
    })
  },
  methods: {
    getNumberFormatted,
    getTotalOferta (company) {
      const companyLicitacionDetails = this.licitacionDetails.filter(detail => detail.company_id === company.id)

      const total = companyLicitacionDetails.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.price * currentValue.cantidad)
      }, 0)

      return getNumberFormatted(Math.round((total) * 100) / 100)
    },
    getValorTotalFinal (company) {
      const companyLicitacionDetails = this.licitacionDetails.filter(detail => detail.company_id === company.id)

      const total = companyLicitacionDetails.reduce((accumulator, currentValue) => {
        if (currentValue.better_price_landed) {
          return accumulator + (currentValue.price * currentValue.cantidad)
        }
        return accumulator + 0
      }, 0)

      return getNumberFormatted(Math.round((total) * 100) / 100)
    },
    getCompanyLicitacionSelected (company) {
      const productLicitacionDetails = this.licitacionDetails.filter(detail => detail.company_id === company.id)
      return productLicitacionDetails.every(detail => detail.better_price_landed === false) ? '' : '#ffeb3b'
    },
    getCompanyFactorLandedFormat (company) {
      return company.factor_landed > 0 ? company.factor_landed * 100 : 0
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
</style>

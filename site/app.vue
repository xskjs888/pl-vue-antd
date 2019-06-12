<template>

  <a-table :columns="columns"
           :dataSource="dataPool"
           :loading="true"
           :pagination="pagination"
           :scroll="{ y: 860 }"
           :seat="{top:seatTop,bottom: seatBottom}"
           @scroll="onScroll">

  </a-table>

</template>
<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'Cash Assets',
  className: 'column-money',
  dataIndex: 'money',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];

for (var i = 1; i <= 10000; i++) {
  data.push({
    key: i,
    name: 'John Brown-----' + i,
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  })
}

export default {
  data () {
    return {
      dataPool: [],
      columns,
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10000,
        pageSizeOptions: ['20', '50', '100', '200', '500', '1000'],
        showSizeChanger: true,
        total: 10000,
      },
      seatTop: 0,
      seatBottom: 0,
      itemSize: 54,
      remain: 20,
      rowKeeps: 40,
      rowStart: 0,
    }
  },
  created () {
    this.initVirtualScroll();
  },
  methods: {
    onScroll (event) {
      let delta = this.delta
      let offset = document.getElementById('table-container').scrollTop || 0

      delta.direction = offset > delta.scrollTop ? 'D' : 'U'
      delta.scrollTop = offset

      if (delta.total > delta.keeps) {
        this.updateZone(offset)
      } else {
        delta.end = delta.total - 1
      }

      this.calcuPosition()
    },

    updateZone (offset) {
      let delta = this.delta
      let overs = Math.floor(offset / this.itemSize)

      if (delta.direction === 'U') {
        overs = overs - this.remain + 1
      }

      const zone = this.getZone(overs)
      const bench = this.bench || this.remain

      const shouldRenderNextZone = Math.abs(overs - delta.start - bench) === 1
      if (
        !shouldRenderNextZone &&
        (overs - delta.start <= bench) &&
        !zone.isLast && (overs > delta.start)
      ) {
        return
      }

      if (
        shouldRenderNextZone ||
        zone.start !== delta.start ||
        zone.end !== delta.end
      ) {
        delta.end = zone.end
        delta.start = zone.start
        this.forceRender()
      }
    },

    getZone (index) {
      let start, end
      const delta = this.delta

      index = parseInt(index, 10)
      index = Math.max(0, index)

      const lastStart = delta.total - delta.keeps
      const isLast = (index <= delta.total && index >= lastStart) || (index > delta.total)
      if (isLast) {
        end = delta.total - 1
        start = Math.max(0, lastStart)
      } else {
        start = index
        end = start + delta.keeps - 1
      }

      return {
        end,
        start,
        isLast
      }
    },

    forceRender () {
      window.requestAnimationFrame(() => {
        this.$forceUpdate()
      })
    },


    initVirtualScroll () {
      let delta = Object.create(null)
      delta.direction = ''
      delta.scrollTop = 0
      delta.start = this.rowStart
      delta.end = this.rowStart + this.rowKeeps - 1
      delta.keeps = this.rowKeeps
      delta.total = this.pagination.total
      delta.varCache = {}
      delta.varAverSize = 0
      delta.varLastCalcIndex = 0
      this.delta = delta
      this.calcuPosition()
    },

    calcuPosition () {
      let delta = this.delta
      let paddingTop, paddingBottom
      let hasPadding = delta.total > delta.keeps

      if (delta.keeps > delta.total) {
        delta.end = delta.total - 1
      }

      paddingTop = this.itemSize * (hasPadding ? delta.start : 0)
      paddingBottom = this.itemSize * (hasPadding ? delta.total - delta.keeps : 0) - paddingTop

      if (paddingBottom < this.itemSize) {
        paddingBottom = 0
      }

      this.seatTop = paddingTop
      this.seatBottom = paddingBottom

      let list = []
      for (let i = delta.start; i < delta.total && i <= Math.ceil(delta.end); i++) {
        list.push(data[i])
      }

      this.dataPool = list

    }
  },
}
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
.ant-table-body {
  border-bottom: 1px solid #1a7c9e;
  max-height: none !important;
  overflow-y: auto !important;
  height: 902px;
}
</style>
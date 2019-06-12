<template>
  <a-tree-select style="width: 300px"
                 :treeData="treeData"
                 :value="value"
                 :treeCheckStrictly="productTreeCheckStrictly"
                 @change="onChange"
                 treeCheckable
                 :showCheckedStrategy="SHOW_PARENT"
                 searchPlaceholder='Please select'>

<div class="tree-popup-header"
               slot="header"
               slot-scope="{treeCheckStrictly}">
            <a-radio :checked="treeCheckStrictly === false"
                     @click="onTreeCheckStrictly('product',false)">模糊匹配</a-radio>
            <a-radio :checked="treeCheckStrictly === true"
                     @click="onTreeCheckStrictly('product',true)">精确匹配</a-radio>
          </div>

    <span slot="title"
          slot-scope="{title}">
      {{ title }} 测试一下
    </span>
    <span slot="checkchild"
          slot-scope="{key}"
          @click.stop="onSelectChild(key)">
      点我给你钱
    </span>

  </a-tree-select>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_PARENT

const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  scopedSlots: { checkchild: 'checkchild' },
  children: [{
    value: '0-0-0',
    key: '0-0-0',
    scopedSlots: { title: 'title' }
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
  children: [{
    title: 'Child Node3',
    value: '0-1-0',
    key: '0-1-0',
    disabled: true,
  }, {
    title: 'Child Node4',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    title: 'Child Node5',
    value: '0-1-2',
    key: '0-1-2',
  }],
}]
export default {
  data () {
    return {
      value: [],
      treeData,
      SHOW_PARENT,
      productTreeMode: 1,
      productTreeCheckStrictly: false, // 产品是否关联
    }
  },
  methods: {
    onChange (value) {
      console.log('onChange ', value)
      this.value = value
    },
    onSelectChild (key) {
      let values = treeData.find(item => {
        return item.key == key
      }).children.map(item => {
        return item.key
      })
      this.value = [...this.value, values]
      console.log(this.value)
    },
    onTreeCheckStrictly (key, value) {
      this[key + 'TreeCheckStrictly'] = value
    }
  },
}
</script>
<!--  -->

<template>
  <div
    v-if="isMenu"
    :style="{ top: mouseY + 'px', left: mouseX + 'px' }"
    class="row-detail"
    ref="menuRef"
  >
    <div class="menu">
      <div
        class="menu-item"
        v-for="item in menus"
        :key="item.value"
        @click="selectEvent(item.value)"
      >
        <i :class="['iconfont', item.icon]"></i>
        <div>
          <span>
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch, computed, inject } from 'vue'
import {
  insertRowAbove,
  insertRowBelow,
  deleteRow,
  addSubRow,
  createNewRowData,
} from '@/components/Table/SuperTable/utils/EditRow'
import { UseData, UseActiveCell } from '@/components/Table/SuperTable/type'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  mousePosition: {
    type: Object as () => { x: number; y: number } | null,
    required: false,
    default: null,
  },
  isMenu: {
    type: Boolean,
    required: true,
  },
})

const mouseX = computed(() => props.mousePosition?.x)
const mouseY = computed(() => props.mousePosition?.y)
const menuRef = ref<HTMLElement | null>(null)
const menus = ref([
  {
    label: '向上插入一行',
    icon: 'icon-above',
    value: 'up',
  },
  {
    label: '向下插入一行',
    icon: 'icon-below',
    value: 'down',
  },
  {
    label: '删除当前行',
    icon: 'icon-delete',
    value: 'delete',
  },
  {
    label: '查看详情',
    icon: 'icon-detail',
    value: 'detail',
  },
  {
    label: '添加子级',
    icon: 'icon-add-children',
    value: 'add',
  },
])

const emit = defineEmits(['update:isMenu', 'update:isDetail'])

const handleClickOutside = (event: MouseEvent) => {
  if (props.isMenu && menuRef.value && !menuRef.value.contains(event.target as Node)) {
    emit('update:isMenu', false)
  }
}

watch(
  () => props.isMenu,
  (newVal) => {
    if (newVal) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
  },
)

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const selectEvent = (value: string) => {
  switch (value) {
    case 'up':
      insertRow('up')
      break
    case 'down':
      insertRow('down')
      break
    case 'delete':
      deleteRowData()
      break
    case 'detail':
      emit('update:isDetail', true)
      emit('update:isMenu', false)
      break
    case 'add':
      addChildrenRow()
      break
  }
}

const useData = inject('useData') as UseData
const useActiveCell = inject('useActiveCell') as UseActiveCell

const insertRow = (type: 'up' | 'down') => {
  const data = useData.data.value
  const activeCell = useActiveCell.activeCell.value
  if (!activeCell) return
  const id = activeCell.row.id

  const newRow = createNewRowData(data)
  let newData: any[] = []
  switch (type) {
    case 'up':
      newData = insertRowAbove(data, id, newRow)
      break
    case 'down':
      newData = insertRowBelow(data, id, newRow)
      break
  }

  useData.updateData(newData)
  emit('update:isMenu', false)
}

const deleteRowData = () => {
  const data = useData.data.value
  const activeCell = useActiveCell.activeCell.value
  if (!activeCell) return
  const newData = deleteRow(data, activeCell.row.id)
  useData.updateData(newData)
  emit('update:isMenu', false)
}

const addChildrenRow = () => {
  const data = useData.data.value
  const renderData = useData.renderData.value
  const activeCell = useActiveCell.activeCell.value
  if (!activeCell) return

  const newRow = createNewRowData(data)
  const newData = addSubRow(renderData, activeCell.row.id, newRow)
  useData.updateData(newData)
  emit('update:isMenu', false)
}
</script>

<style lang="scss" scoped>
.row-detail {
  position: absolute;
  z-index: 9999;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
.menu {
  width: 100%;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 5px;
}
.menu-item {
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  gap: 10px;
  &:hover {
    background-color: $icon-hover-bg;
  }
}
</style>

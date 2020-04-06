export default {
    openOptions (target: any) {
        target.$refs.input.focus()
        target.showMenu = true
        target.mousedownState = false
    },
    blurInput (target: any) {
        if (!target.mousedownState) {
            target.searchText = ''
            target.closeOptions()
        }
    },
    closeOptions (target: any) {
        target.showMenu = false
    },
    prevItem (target: any) {
        const prevIndex: number = target.pointer - 1
        const prevIndexScrollTop: number = target.$el.offsetHeight * prevIndex

        if (prevIndex >= 0) {
            target.pointer = prevIndex
        }

        target.$refs.menu.scrollTop = prevIndexScrollTop
    },
    nextItem (target: any) {
        const nextIndex: number = target.pointer + 1
        const nextIndexScrollTop: number = target.$el.offsetHeight * nextIndex
        if (nextIndex <= (target.filteredOptions.length - 1)) {
            target.pointer = nextIndex
        }
      
        const currentMenuHeight: number = target.$refs.menu.offsetHeight
        const currentPage: number = Math.ceil((target.$refs.menu.scrollTop + target.$el.offsetHeight) / currentMenuHeight)
        const itemPage: number = Math.ceil(nextIndexScrollTop / currentMenuHeight)
    
        if (currentPage !== itemPage) {
            target.$refs.menu.scrollTop = (itemPage - 1) * target.$refs.menu.offsetHeight
        }
    },
    enterItem (target: any) {
        const currentItem: any = target.filteredOptions[target.pointer]
        if (currentItem) {
            target.selectItem(currentItem)
        }
    },
    pointerSet (target: any, index: number) {
        target.pointer = index
    },
    pointerAdjust (target: any) {
        if (target.pointer >= target.filteredOptions.length - 1) {
            target.pointer = target.filteredOptions.length ? target.filteredOptions.length - 1 : 0
        }
    },
    mousedownItem (target: any) {
        target.mousedownState = true
    }
}
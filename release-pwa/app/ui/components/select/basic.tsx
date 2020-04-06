import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { escapedRegExp } from './util'
import VIcon from '../icon/icon'
import common from './common'

@Component({
    name: 'v-basic-select',
    components: {
        VIcon
    }
})
export default class VBasicSelect extends Vue {
    @Prop({ default: null }) readonly id: string | any
    @Prop({ default: '' }) readonly name: string | undefined
    @Prop({ default: false }) readonly isError: boolean | undefined
    @Prop({ default: false }) readonly isDisabled: Boolean | undefined
    @Prop({ default: '' }) readonly placeholder: string | undefined
    @Prop({ default: (label: string, inputLabel: string) => { 
        if (label) return label.match(escapedRegExp(inputLabel))
    }}) readonly filterPredicate: Function | any
    @Prop({ default: () => '' }) readonly customAttr: Function | any
    @Prop(Array) readonly options: any[] | any
    @Prop({ default: () => { return { value: '', label: '' }}}) selectedOption: object | any

    @Watch('filteredOptions')
    onFilteredOptionsChanged () {
        this.pointerAdjust()
    }
    @Watch('searchText')
    onSearchTextChanged () {
        this.$emit('searchchange', this.searchText)
    }
    @Watch('selectedOption')
    onSelectedOptionChanged (newValue: any) {
        if (newValue && newValue.value) {
            this.pointer = this.filteredOptions.findIndex((option: any) => {
                return option.value === newValue.value
            })
        } else {
            this.pointer = -1
        }
    }

    public showMenu: boolean = false
    public searchText: string = ''
    public mousedownState: boolean = false
    public pointer: number = -1

    private get searchTextCustomAttr () {
        if (this.selectedOption && this.selectedOption.value) {
          return this.customAttr(this.selectedOption)
        }
        return ''
    }

    private get inputLabel () {
        if (this.searchText) {
          return ''
        } else {
          let label = this.placeholder
          if (this.selectedOption.label) {
            label = this.selectedOption.label
          }
          return label
        }
    }

    private get customAttrs () {
        try {
          if (Array.isArray(this.options)) {
            return this.options.map(o => this.customAttr(o))
          }
        } catch (e) {
          // if there is an error, just return an empty array
        }
        return []
    }

    private get labelClass () {
        if (!this.selectedOption.label && this.placeholder) {
          return 'default'
        } else {
          return ''
        }
    }

    private get menuClass () {
        return {
          visible: this.showMenu,
          hidden: !this.showMenu
        }
    }
    
    private get menuStyle () {
        return {
          display: this.showMenu ? 'block' : 'none'
        }
    }
    
    private get filteredOptions () {
        if (this.searchText) {
            console.log(this.options)
            return this.options.filter((option: any) => {
                try {
                    return this.filterPredicate(option.label, this.searchText)
                } catch (e) {
                    return true
                }
            })
        } else {
          return this.options
        }
    }

    public deleteTextOrItem () {
        if (!this.searchText && this.selectedOption) {
          this.selectItem({})
          this.openOptions()
        }
    }

    public openOptions () {
        common.openOptions(this)
    }

    public blurInput () {
        common.blurInput(this)
    }
    
    public closeOptions () {
        common.closeOptions(this)
    }
    public prevItem () {
        common.prevItem(this)
    }

    public nextItem () {
        common.nextItem(this)
    }

    public enterItem () {
        common.enterItem(this)
    }

    public pointerSet (index: number) {
        common.pointerSet(this, index)
    }

    public pointerAdjust () {
        common.pointerAdjust(this)
    }
    public mousedownItem () {
        common.mousedownItem(this)
    }
      
    public selectItem (option: any) {
        this.searchText = ''
        this.closeOptions()
        this.$emit('select', option)

        if (option.value === option.label) {
          this.searchText = option.value
        }
    }

    protected render (h: CreateElement) {
        return (
            <div
                class={['ui fluid search selection dropdown', {'active visible': this.showMenu, 'error': this.isError, 'disabled': this.isDisabled }]}
                onClick={() => { this.openOptions() }}
                onFocus={() => { this.openOptions() }}>
                <i class="dropdown icon"></i>
                <input
                    class="search"
                    autocomplete="off"
                    tabindex="0"
                    id={this.id}
                    name={this.name}
                    value={this.searchText}
                    ref="input"
                    onInput={(e: any) => { this.searchText = e.target.value }}
                    // @focus.prevent="openOptions"
                    // @keyup.esc="closeOptions"
                    // @blur="blurInput"
                    // @keydown.up="prevItem"
                    // @keydown.down="nextItem"
                    // @keydown.enter.prevent=""
                    // @keyup.enter.prevent="enterItem"
                    // @keydown.delete="deleteTextOrItem" 
                />
                <div class={['label', this.labelClass]} data-vss-custom-attr={this.searchTextCustomAttr}>{this.inputLabel}</div>
                <div
                    ref="menu"
                    tabindex="-1"
                    class={['menu', this.menuClass]}
                    style={this.menuStyle}
                    onMousedown={(e: Event) => { e.preventDefault() }}>
                    {this.filteredOptions.map((option: any, idx: number) => {
                        return (
                            <div
                                key={idx}
                                class={['item', {'selected': option.selected || this.pointer === idx }]}
                                data-vss-custom-attr={this.customAttrs[idx] ? this.customAttrs[idx] : ''}
                                onClick={() => { this.selectItem(option) }}
                                onMousedown={() => { this.mousedownItem() }}
                                onMouseenter={() => { this.pointerSet(idx) }}>
                                {option.label}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
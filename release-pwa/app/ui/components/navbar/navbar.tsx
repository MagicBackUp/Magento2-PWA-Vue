import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { clickOutside } from '../../directives'
import {
    FIXED_TOP_CLASS,
    BODY_FIXED_TOP_CLASS,
    BODY_SPACED_FIXED_TOP_CLASS,
    FIXED_BOTTOM_CLASS,
    BODY_FIXED_BOTTOM_CLASS,
    BODY_SPACED_FIXED_BOTTOM_CLASS,
    isFilled
} from '../../config'
import VNavBurger from './burger'

@Component({
    name: 'v-navbar',
    components: {
        VNavBurger
    },
    directives: {
        clickOutside
    }
})
export default class VNavBar extends Vue {
    @Prop([String, Object]) readonly type: boolean | object | any
    @Prop({ default: false }) readonly transparent: boolean | any
    @Prop({ default: false }) readonly fixedTop: boolean | any
    @Prop({ default: false }) readonly fixedBottom: boolean | any
    @Prop({ default: false }) readonly isActive: boolean | any
    @Prop(String) readonly wrapperClass: string | any
    @Prop({ default: true }) readonly closeOnClick: boolean | any
    @Prop({ default: true }) readonly mobileBurger: boolean | any
    @Prop(Boolean) readonly spaced: boolean | any
    @Prop(Boolean) readonly shadow: boolean | any

    @Watch('isActive', { immediate: true })
    onIsActiveChanged(value: boolean) {
        this.internalIsActive = value
    }
    @Watch('fixedTop', { immediate: true })
    onFixedTopChanged(value: boolean) {
            this.checkIfFixedPropertiesAreColliding()
            if (value) {
                this.setBodyClass(BODY_FIXED_TOP_CLASS)
                this.spaced && this.setBodyClass(BODY_SPACED_FIXED_TOP_CLASS)
            } else {
                this.removeBodyClass(BODY_FIXED_TOP_CLASS)
                this.removeBodyClass(BODY_SPACED_FIXED_TOP_CLASS)
            }
    }
    @Watch('fixedBottom', { immediate: true })
    onFixedBottomChanged(value: boolean) {
        this.checkIfFixedPropertiesAreColliding()
        if (value) {
            this.setBodyClass(BODY_FIXED_BOTTOM_CLASS)
            this.spaced && this.setBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS)
        } else {
            this.removeBodyClass(BODY_FIXED_BOTTOM_CLASS)
            this.removeBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS)
        }
       
    }

    private internalIsActive: boolean = this.isActive

    private get isOpened () {
        return this.internalIsActive
    }
    
    private get computedClasses () {
        return [
            this.type,
            {
                [FIXED_TOP_CLASS]: this.fixedTop,
                [FIXED_BOTTOM_CLASS]: this.fixedBottom,
                'is-spaced': this.spaced,
                'has-shadow': this.shadow,
                'is-transparent': this.transparent
            }
        ]
    }

    public beforeDestroy () {
        if (this.fixedTop) {
            const className: string = this.spaced
                ? BODY_SPACED_FIXED_TOP_CLASS : BODY_FIXED_TOP_CLASS
            this.removeBodyClass(className)
        } else if (this.fixedBottom) {
            const className = this.spaced
                ? BODY_SPACED_FIXED_BOTTOM_CLASS : BODY_FIXED_BOTTOM_CLASS
            this.removeBodyClass(className)
        }
    }

    public toggleActive () {
        this.internalIsActive = !this.internalIsActive
        this.emitUpdateParentEvent()
    }

    public closeMenu () {
        if (this.closeOnClick) {
            this.internalIsActive = false
            this.emitUpdateParentEvent()
        }
    }

    public emitUpdateParentEvent () {
        this.$emit('update:isActive', this.internalIsActive)
    }

    public setBodyClass (className: string) {
        if (typeof window !== 'undefined') {
            document.body.classList.add(className)
        }
    }

    public removeBodyClass(className: string) {
        if (typeof window !== 'undefined') {
            document.body.classList.remove(className)
        }
    }

    public checkIfFixedPropertiesAreColliding () {
        const areColliding: boolean = this.fixedTop && this.fixedBottom
        if (areColliding) {
            throw new Error('You should choose if the BNavbar is fixed bottom or fixed top, but not both')
        }
    }

    public genNavbar (createElement: CreateElement) {
        let navBarSlots: any[] = [
            this.genNavbarBrandNode(createElement),
            this.genNavbarSlotsNode(createElement)
        ]
        if (!isFilled(this.wrapperClass)) {
            return this.genNavbarSlots(createElement, navBarSlots)
        }
        
        const navWrapper: any = createElement('div', {
            class: this.wrapperClass
        }, navBarSlots)
        return this.genNavbarSlots(createElement, [navWrapper])
    }

    public genNavbarSlots (createElement: CreateElement, slots: any) {
        return createElement('nav', {
            staticClass: 'navbar',
            class: this.computedClasses,
            attrs: {
                role: 'navigation',
                'aria-label': 'main navigation'
            },
            directives: [
                {
                    name: 'click-outside',
                    value: this.closeMenu
                }
            ]
        }, slots)
    }

    public genNavbarBrandNode (createElement: CreateElement) {
        return createElement('div', {
            class: 'navbar-brand'
        }, [this.$slots.brand, this.genBurgerNode(createElement)])
    }
    
    public genBurgerNode (createElement: CreateElement) {
        if (this.mobileBurger) {
            const defaultBurgerNode: any = createElement('v-navbar-burger', {
                props: {
                    isOpened: this.isOpened
                },
                on: {
                    click: this.toggleActive
                }
            })
            const burgerSlots: any = this.$scopedSlots.burger
            const hasBurgerSlot: any = !!burgerSlots
            
            return hasBurgerSlot
                ? burgerSlots({
                    isOpened: this.isOpened,
                    toggleActive: this.toggleActive
                })
                : defaultBurgerNode
        }
    }

    public genNavbarSlotsNode (createElement: CreateElement) {
        return createElement('div', {
            staticClass: 'navbar-menu',
            class: { 'is-active': this.isOpened }
        }, [this.genMenuPosition(createElement, 'start'), this.genMenuPosition(createElement, 'end')])
    }

    public genMenuPosition (createElement: CreateElement, positionName: string) {
        return createElement('div', {
            staticClass: `navbar-${positionName}`
        }, this.$slots[positionName])
    }

    protected render (h: CreateElement) {
        return this.genNavbar(h)
    }
}
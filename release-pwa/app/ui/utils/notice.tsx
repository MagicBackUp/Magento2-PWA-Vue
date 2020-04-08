import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { removeElement } from './helpers'
import config from './config'

@Component
export default class VNoticeMixin extends Vue {
    @Prop({ default: 'is-dark' }) readonly type: string | undefined
    @Prop(String) readonly message: string | undefined
    @Prop(Number) readonly duration: number | undefined
    @Prop({ default: false }) readonly queue: boolean | undefined
    @Prop({ default: 'is-top' }) readonly position: 'is-top-right' | 'is-top' | 'is-top-left' | 'is-bottom-right' | 'is-bottom' | 'is-bottom-left' | undefined
    @Prop(String) readonly container: string | undefined


    public isActive: boolean = false
    public parentTop: any = null
    public parentBottom: any = null
    public newContainer: any = this.container || config.defaultContainerElement

    private get correctParent () {
        switch (this.position) {
            case 'is-top-right':
            case 'is-top':
            case 'is-top-left':
                return this.parentTop

            case 'is-bottom-right':
            case 'is-bottom':
            case 'is-bottom-left':
                return this.parentBottom
        }
    }

    private get transition () {
        switch (this.position) {
            case 'is-top-right':
            case 'is-top':
            case 'is-top-left':
                return {
                    enter: 'fadeInDown',
                    leave: 'fadeOut'
                }
            case 'is-bottom-right':
            case 'is-bottom':
            case 'is-bottom-left':
                return {
                    enter: 'fadeInUp',
                    leave: 'fadeOut'
                }
        }
    }

    public beforeMount () {
        this.setupContainer()
    }

    public mounted () {
        this.showNotice()
    }

    public shouldQueue () {
        const queue: any = this.queue !== undefined
            ? this.queue
            : config.defaultNoticeQueue

        if (!queue) return false

        return (
            this.parentTop.childElementCount > 0 ||
            this.parentBottom.childElementCount > 0
        )
    }

    public close() {
        clearTimeout(this.timer)
        this.isActive = false
        this.$emit('close')

        setTimeout(() => {
            this.$destroy()
            removeElement(this.$el)
        }, 150)
    }

    public showNotice () {
        if (this.shouldQueue()) {
            setTimeout(() => this.showNotice(), 250)
            return false
        }

        this.correctParent.insertAdjacentElement('afterbegin', this.$el)
        this.isActive = true

        if (!this.indefinite) {
            this.timer = setTimeout(() => this.close(), this.newDuration)
        }
    }

    public setupContainer () {
        this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-top')
        this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-bottom')

        if (this.parentTop && this.parentBottom) return

        if (!this.parentTop) {
            this.parentTop = document.createElement('div')
            this.parentTop.className = 'notices is-top'
        }

        if (!this.parentBottom) {
            this.parentBottom = document.createElement('div')
            this.parentBottom.className = 'notices is-bottom'
        }

        const container = document.querySelector(this.newContainer) || document.body

        container.appendChild(this.parentTop)
        container.appendChild(this.parentBottom)

        if (this.newContainer) {
            this.parentTop.classList.add('has-custom-container')
            this.parentBottom.classList.add('has-custom-container')
        }
    }
}
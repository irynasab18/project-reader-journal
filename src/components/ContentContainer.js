import Section from '../common/Section.js';

export default class ContentContainer extends Section {
    constructor(customClass = '') {
        super({ id: 'content', customClass });
    }
}
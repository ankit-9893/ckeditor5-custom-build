import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordCountService {
  plainText: string = '';

  constructor() {}

  getCount(editorValue: string) {
    this.plainText = '';
    this.convertToPlainText(editorValue);
    const regex = new RegExp('([\\p{L}\\p{N}]+\\S?)+', 'gu');
    const result: any = {};
    if (this.plainText) {
      const detectedWords = this.plainText.match(regex) || [];
      result['words'] = detectedWords.length;
      result['characters'] = this.plainText.replace(/\n/g, '').length;
    }
    return result;
  }

  convertToPlainText(editorData: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(editorData, 'text/html');

    let modelText = '';
    const rootNode = doc.body as any;

    for (const childNode of rootNode.childNodes) {
      const childText = this.modelElementToPlainText(childNode);
      if (childText.trim() !== '') {
        if (modelText !== '') {
          modelText += '\n';
        }
        modelText += childText;
      }
    }
    this.plainText = modelText;
  }

  modelElementToPlainText(node: any) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      let text = '';
      let prev = null;
      for (const childNode of node.childNodes) {
        const childText = this.modelElementToPlainText(childNode);
        if (prev && prev.nodeType === Node.ELEMENT_NODE) {
          text += '\n';
        }
        text += childText;
        prev = childNode;
      }
      return text;
    }
    return '';
  }
}

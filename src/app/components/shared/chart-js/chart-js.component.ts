import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from "@angular/core";
import "chart.js";

declare var window: any;
@Component({
  selector: 'app-shared-chart',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.css']
})
export class ChartJsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild("canvas") canvas: ElementRef;

  @Input() config;

  private chart;

  constructor() { }

  ngOnInit() {
    
  }
  // 子组件加载完成后，渲染图标
  ngAfterViewInit() {
    this.render();
  }
  // 渲染图表
  render() {
    this.chart = new window.Chart(
      this.canvas.nativeElement.getContext("2d"),
      this.config
    );
    this.chart.height = "100%";
  }
  // 判断Input参数config 是否变化，如果变化，触发更新绘图
  ngOnChanges({ config }: SimpleChanges) {

    if (config && !config.isFirstChange()) {

      this.destroyChart();
      this.render();
    }
  }
  // 销毁chart  
  ngOnDestroy() {
    this.destroyChart();
  }
  // 销毁chart主体
  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }
}
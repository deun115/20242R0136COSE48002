import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:structure/config/palette.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';
import 'package:syncfusion_flutter_core/theme.dart';

class PartEval extends StatelessWidget {
  final int? idx;
  final double value;
  final List<String>? selectedText;
  final Function(dynamic value)? onChanged;

  PartEval({
    super.key,
    this.idx,
    required this.value,
    required this.selectedText,
    required this.onChanged,
  });

  final List<String> imagePath = [
    'assets/images/eval_Marbling.png',
    'assets/images/eval_Color.png',
    'assets/images/eval_Texture.png',
    'assets/images/eval_SurfaceMoisture.png',
    'assets/images/eval_Overall.png'
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        // 기준 이미지
        if (idx != null)
          Image.asset(
            imagePath[idx!],
            width: double.infinity,
            height: 68.h,
            fit: BoxFit.fitWidth,
          ),

        // 기준 텍스트
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            for (int i = 2; i < 7; i++)
              Text(
                selectedText![i],
                style: Palette.h5,
                textAlign: TextAlign.center,
              ),
          ],
        ),
        SizedBox(height: 16.h),

        // 슬라이더
        SfSliderTheme(
          data: SfSliderThemeData(
            tooltipBackgroundColor: Palette.primary,
            activeTrackHeight: 12.h,
            inactiveTrackHeight: 12.h,
            overlayRadius: 0,
          ),
          child: SfSlider(
            min: 1.0,
            max: 10.0,
            value: value,
            interval: 1,
            showTicks: true,
            showLabels: false,
            activeColor: Palette.primary,
            inactiveColor: Palette.onPrimary,
            enableTooltip: true,
            onChanged: onChanged,
            tooltipTextFormatterCallback:
                (dynamic actualValue, String formattedText) {
              final double newValue = actualValue;
              return newValue.toStringAsFixed(1);
            },
          ),
        ),
      ],
    );
  }
}

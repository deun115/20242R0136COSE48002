import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:structure/config/palette.dart';

class CamShutter extends StatelessWidget {
  final bool isReady;

  const CamShutter({super.key, required this.isReady});

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        Image.asset(
          'assets/images/cam-shutter.png',
          width: 104.w,
          height: 104.w,
        ),
        Image.asset(
          'assets/images/cam-shutter-out.png',
          width: 128.w,
          height: 128.w,
          color: isReady ? Palette.primary : Palette.error,
        ),
        Image.asset(
          'assets/images/cam-shutter-in.png',
          width: 40.w,
          height: 40.w,
          color: isReady ? Palette.primary : Palette.error,
        ),
      ],
    );
  }
}

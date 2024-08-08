//
//
// 육류 이미지 등록 페이지(수정 불가!) : Normal
//
//

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provider/provider.dart';
import 'package:structure/components/custom_app_bar.dart';
import 'package:structure/components/image_card.dart';
import 'package:structure/config/palette.dart';
import 'package:structure/viewModel/data_management/normal/not_editable/insertion_meat_image_not_editable_view_model.dart';

class MeatImageNotEditableScreen extends StatelessWidget {
  const MeatImageNotEditableScreen({super.key});

  @override
  Widget build(BuildContext context) {
    InsertionMeatImageNotEditableViewModel meatImageNotEditableViewModel =
        context.watch<InsertionMeatImageNotEditableViewModel>();

    return Scaffold(
      appBar: const CustomAppBar(title: '원육 단면 촬영'),
      body: Container(
        margin: EdgeInsets.symmetric(horizontal: 40.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(height: 24.h),

            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                // 촬영 날짜
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('촬영 날짜', style: Palette.h4),
                      SizedBox(height: 16.h),
                      Container(
                        width: double.infinity,
                        height: 88.h,
                        decoration: BoxDecoration(
                          color: Palette.onPrimaryContainer,
                          borderRadius: BorderRadius.circular(20.r),
                        ),
                        alignment: Alignment.centerLeft,
                        child: Padding(
                          padding: EdgeInsets.only(left: 16.w),
                          child: Text(
                            meatImageNotEditableViewModel.date,
                            style: Palette.h4,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(width: 16.w),

                // 촬영자
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('촬영자', style: Palette.h4),
                      SizedBox(height: 16.h),
                      Container(
                        width: double.infinity,
                        height: 88.h,
                        decoration: BoxDecoration(
                          color: Palette.onPrimaryContainer,
                          borderRadius: BorderRadius.circular(20.r),
                        ),
                        alignment: Alignment.centerLeft,
                        child: Padding(
                          padding: EdgeInsets.only(left: 16.w),
                          child: Text(
                            meatImageNotEditableViewModel.userName,
                            style: Palette.h4,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: 32.h),

            // 단면 사진 촬영 텍스트
            Text('단면 촬영 사진', style: Palette.h4),
            SizedBox(height: 16.h),

            // 이미지
            ImageCard(imagePath: meatImageNotEditableViewModel.imagePath),
          ],
        ),
      ),
    );
  }
}

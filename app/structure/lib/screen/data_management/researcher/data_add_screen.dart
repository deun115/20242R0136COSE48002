//
//
// 데이터 추가 페이지(View) : Researcher
//
//

import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provider/provider.dart';
import 'package:structure/components/custom_app_bar.dart';
import 'package:structure/components/custom_divider.dart';
import 'package:structure/components/deep_aging_card.dart';
import 'package:structure/components/loading_screen.dart';
import 'package:structure/config/palette.dart';
import 'package:structure/viewModel/data_management/researcher/data_add_view_model.dart';

class DataAddScreen extends StatefulWidget {
  const DataAddScreen({super.key});

  @override
  State<DataAddScreen> createState() => _DataAddScreenState();
}

class _DataAddScreenState extends State<DataAddScreen> {
  @override
  Widget build(BuildContext context) {
    DataAddViewModel dataAddViewModel = context.watch<DataAddViewModel>();

    return Scaffold(
      appBar: CustomAppBar(
        title: dataAddViewModel.meatModel.meatId!,
        actionButton: IconButton(
          iconSize: 48.w,
          onPressed: () => dataAddViewModel.clickedQRButton(),
          icon: const Icon(Icons.qr_code_scanner_rounded),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          margin: EdgeInsets.symmetric(horizontal: 40.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 24.h),

              // 원육
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('원육', style: Palette.h3),

                  // 등록자
                  Text(dataAddViewModel.userName, style: Palette.h5),
                ],
              ),
              SizedBox(height: 16.h),

              // 원육 추가데이터
              DeepAgingCard(
                isRaw: true,
                deepAgingNum: '',
                mainText:
                    '${dataAddViewModel.speciesValue} > ${dataAddViewModel.secondary}',
                butcheryDate: dataAddViewModel.butcheryDate,
                completed: dataAddViewModel.meatModel.rawCompleted,
                onTap: () => dataAddViewModel.clickedRawMeat(),
              ),
              SizedBox(height: 16.h),

              const CustomDivider(),
              SizedBox(height: 16.h),

              // 처리육, 딥에이징 데이터 텍스트
              Text('처리육', style: Palette.h3),
              SizedBox(height: 16.h),
              Text('딥에이징 데이터', style: Palette.h4),
              SizedBox(height: 16.h),

              // 딥에이징 리스트
              SizedBox(
                height: 450.h,
                // 딥에이징 추가 데이터 입력 (DeepAgingCard 컴포넌트 사용) - 클릭 | 삭제 시 대응되는 함수 호출
                // index 0은 원육 정보이기 때문에 index + 1 부터 리스트에 표시해야 함
                child: dataAddViewModel.isLoading
                    ? const Center(child: LoadingScreen())
                    : Scrollbar(
                        thumbVisibility: true,
                        child: ListView.builder(
                          itemCount:
                              dataAddViewModel.meatModel.deepAgingInfo!.length -
                                  1,
                          itemBuilder: (BuildContext context, int index) {
                            return Padding(
                              padding: EdgeInsets.symmetric(vertical: 16.h),
                              child: DeepAgingCard(
                                deepAgingNum:
                                    '${dataAddViewModel.meatModel.deepAgingInfo![index + 1]['seqno']}회차',
                                mainText:
                                    '${dataAddViewModel.meatModel.deepAgingInfo![index + 1]['minute']}분',
                                butcheryDate: dataAddViewModel.meatModel
                                    .deepAgingInfo![index + 1]['date'],
                                // TODO : complete check
                                completed: false,
                                onTap: () async => await dataAddViewModel
                                    .clickedProcessedMeat(index + 1),
                                delete: () async => await dataAddViewModel
                                    .deleteList(index + 1),
                              ),
                            );
                          },
                        ),
                      ),
              ),
              SizedBox(height: 32.h),

              // 딥에이징 데이터 추가 버튼
              SizedBox(
                width: double.infinity,
                height: 136.h,
                child: InkWell(
                  borderRadius: BorderRadius.circular(20.r),
                  onTap: () => dataAddViewModel.addDeepAgingData(),
                  child: DottedBorder(
                    radius: Radius.circular(20.r),
                    borderType: BorderType.RRect,
                    color: Palette.onPrimary,
                    strokeWidth: 2.sp,
                    dashPattern: [12.w, 12.w],
                    child: Center(
                      child: Image.asset(
                        'assets/images/add_circle.png',
                        cacheWidth: 40,
                        cacheHeight: 40,
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 16.h),

              const CustomDivider(),
              SizedBox(height: 16.h),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('총 처리 횟수 및 시간', style: Palette.h4),

                  // 처리 횟수 / 처리 시간
                  Text(
                    dataAddViewModel.total,
                    textAlign: TextAlign.center,
                    style: Palette.h3.copyWith(color: Palette.primary),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

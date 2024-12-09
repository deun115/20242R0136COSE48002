import 'dart:io';
import 'package:flutter/material.dart';
import 'package:ml_test/home_view_model.dart';
import 'package:provider/provider.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  @override
  Widget build(BuildContext context) {
    HomeViewModel homeViewModel = context.watch<HomeViewModel>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Image Picker'),
        actions: [
          IconButton(
            onPressed: homeViewModel.pickImage,
            icon: const Icon(Icons.image),
          )
        ],
      ),
      body: Column(
        children: [
          Container(
            color: Colors.grey,
            height: MediaQuery.of(context).size.width,
            width: MediaQuery.of(context).size.width,
            child: homeViewModel.file != null
                ? Image.file(File(homeViewModel.file!.path), fit: BoxFit.cover)
                : const Icon(Icons.image, size: 50, color: Colors.white),
          ),
          const SizedBox(height: 40),
          ElevatedButton(
            onPressed: homeViewModel.classification,
            child: const Text("Evaluate"),
          ),
          const SizedBox(height: 8),

          // 예측 결과
          Text('Model Load time: ${homeViewModel.modelLoadtime} ms'),
          Text('Elapsed time: ${homeViewModel.elapsedTime} ms'),
          Text('마블링: ${homeViewModel.predictions[0].toStringAsFixed(2)}'),
          Text('색: ${homeViewModel.predictions[1].toStringAsFixed(2)}'),
          Text('텍스쳐: ${homeViewModel.predictions[2].toStringAsFixed(2)}'),
          Text('육즙: ${homeViewModel.predictions[3].toStringAsFixed(2)}'),
          Text('기호도: ${homeViewModel.predictions[4].toStringAsFixed(2)}'),
          const SizedBox(height: 8),

          ElevatedButton(
            onPressed: homeViewModel.releaseModel,
            child: const Text("Release"),
          ),
        ],
      ),
    );
  }
}

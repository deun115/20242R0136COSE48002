import 'package:flutter/material.dart';
import 'package:ml_test/home_view.dart';
import 'package:ml_test/home_view_model.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ChangeNotifierProvider(
        create: (context) => HomeViewModel(context: context),
        child: const HomeView(),
      ),
    );
  }
}

from setuptools import setup

setup(
    name='filter-processor',
    packages=['src'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)